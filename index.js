const express = require('express');

const productRoutes = require('./routes/productsRoutes');

const app = express();
const port = 3000;

app.use(productRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});