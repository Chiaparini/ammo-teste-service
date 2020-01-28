const express = require('express');
const router = express.Router();
const productService = require('../services/product');

router.get('/', async (req, res) => {
  try {
    const results = await productService
      .getProducts(Number(req.query.limit || 8), Number(req.query.page || 0), req.query.search);

    res.status(200).send({...results});
  } catch {
    res.status(500).send('Something went wrong! :(');
  }
});

module.exports = router;