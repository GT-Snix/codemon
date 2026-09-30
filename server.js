const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const cache = {};
const app = express()
const port = 3000

const pathToFile = path.join(__dirname, "db.json");
async function readFile() {
  try {
    let data = await fs.readFile(pathToFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}
async function readFileWithDelay() {
    try {
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 1500);
        });
        let data = await readFile();
        return data;
    } catch (err) {
        console.error(err);
    }
}
app.get('/products', async (req, res) => {
    try {
        let key = req.url;
        let value = cache[key];
        if (value){
            res.set('X-Cache', 'HIT');
            return res.json(value);
        }
        let products = await readFileWithDelay();
        cache[key] = products;
        res.set('X-Cache', 'MISS');
        return res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        let key = req.url;
        let value = cache[key];
        if (value) {
            res.set('X-Cache', 'HIT');
            return res.json(value);
        }
        let {id} = req.params;
        id = Number(id);
        let products = await readFileWithDelay();
        let product = products.find(p => p.id === id);
        if (product) {
            cache[key] = product;
            res.set('X-Cache', 'MISS');
            return res.json(product);
        } else {
            return res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})