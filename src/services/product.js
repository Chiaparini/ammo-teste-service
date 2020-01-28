const models = require('../models');
const { Op } = require('sequelize');
const Product = models.Product;
const Style = models.Style;
const Picture = models.Picture;

const getProducts = async (limit, page, search = '') => {
  try {
    if (page >= 1) page -= 1;
  
    const offset = page * limit;

    const products = await Product.findAndCountAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`
            },
          },
          {
            description: {
              [Op.like]: `%${search}%`
            }
          }
        ]
      },
      offset,
      limit,
      attributes: {
        exclude: ['styleId', ]
      },
      include: [
        {
          model: Picture,
          as: 'pictures',
          attributes: {
            exclude: [ 'productId' ]
          }
        },
        {
          model: Style,
          as: 'style'
        }
      ],
      distinct: true
    });
    
    const total = products.count;
    const pages = Math.ceil(total / limit); 

    return { products: products.rows, pages, total };
  } catch (err) {

    throw Error(err);
  }
}

module.exports = { getProducts }