const express = require('express');
const products = require('./routes/product');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use('/products', products);

app.listen(PORT, console.log(`Service running on PORT: ${PORT}`));

// Test porpuses
module.exports = app;