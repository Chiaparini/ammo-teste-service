'use strict';
const fs = require('fs');
const faker = require('faker');
const s3 = require('../aws');
const lençoisMock = require('../mock/lençois');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const lencois = lençoisMock.map(async (el, index) => {
      // chance to generate a discount
      let discount = 0;
      if (faker.random.number(100) < 40) {
        discount = faker.random.number({min: 10, max: el.price - 1});
      }

      const id = await queryInterface.bulkInsert('Product', [
        {
          ...el,
          discountPrice: discount,
          styleId: faker.random.number({ min: 1, max: 6 }),
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent(),
        }
      ]);

      const hasManyPictures = faker.random.number({ min: 1, max: 4 });
      const files = fs.readdirSync(__dirname + '/../mock/lencois-imgs');

      for (let i = 0; i < hasManyPictures; i++) {
        const img = files[faker.random.number(files.length - 1)];
        const fileContent = fs.readFileSync(__dirname + '/../mock/lencois-imgs/' + img);

        const uploadedimg = await s3.upload({
          Bucket: 'ammo-teste-imagens',
          Key: `imgs/${img}`,
          Body: fileContent,
          ACL: 'public-read',
          ContentType: `image/jpeg`
        }).promise();

        queryInterface.bulkInsert('Picture', [
          {
            productId: id,
            uri: uploadedimg.Location,
            createdAt: faker.date.recent(),
            updatedAt: faker.date.recent()
          }]);
      }
    });

    return Promise.all(lencois);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('Picture', null, {}),
      queryInterface.bulkDelete('Product', null, {}),
    ])
  }
};
