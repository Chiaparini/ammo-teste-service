const express = require('express');
const router = express.Router();
const models = require('../models');
const Product = models.Product;
const Style = models.Style;
const Picture = models.Picture;
const { Op } = require('sequelize');

router.get('/', (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    let page = Number(req.query.page) || 0;
    const search = req.query.search;

    if (req.query.page >= 1) page = req.query.page - 1;

    const offset = page * limit;
    
    Product.findAndCountAll({
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
    }).then(o => {
      const total = o.count;
      const pages = Math.ceil(total / limit); 

      res.send({ products: o.rows, pages, total });
    }).catch(err => { 
        res.status(500).send(err);
      }
    );
  } catch {
    res.status(500).send('Something went wrong! :(');
  }
});

module.exports = router;