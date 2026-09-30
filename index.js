const express = require('express');
const productsRoutes = require('./routes/productsRoutes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/', productsRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});