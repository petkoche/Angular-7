const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const cors = require('cors');

const PORT = 3005;

const server = jsonServer.create();

const dbPath = path.join(__dirname, './db.json');
const getDbData = () => JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));
const saveDbData = (products) => fs.writeFileSync(dbPath, JSON.stringify(products));

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Get req
server.get('/products', (_, res) => {
  const db = getDbData();
  products = db.products;
  return res.status(200).json(products);
});

server.get('/product/:id', (req, res) => {
  const db = getDbData();
  const { id: productId } = req.params
  product = db.products.find(p => p._id === productId)
  return res.status(200).json(product);
});

//Delete req
server.delete('/product/:id', (req, res) => {
  const db = getDbData();
  const { id: productId } = req.params
  const product = db.products.find(p => p._id == productId);
  const index = db.products.indexOf(product);
  db.products.splice(index, 1); 
  saveDbData(db);
  return res.status(200).json();
});

//Put req
server.put('/product/:id', (req, res) => {
  const db = getDbData();
  const { id: productId } = req.params
  const { prod_name, prod_desc, prod_price  } = req.body;

  const product = db.products.find(p => p._id == productId);

  product.prod_name = prod_name;
  product.prod_desc = prod_desc;
  product.prod_price = prod_price;

  const index = db.products.indexOf(product);
  db.products[index] = product;
  saveDbData(db);
  
  return res.status(200).json(product);
});

//Post req
server.post('/product', (req, res) => {
  const db = getDbData();
  const { prod_name, prod_desc, prod_price  } = req.body;

  const productToCreate = {
    _id: (db.products.length + 1).toString(),
    prod_name,
    prod_desc,
    prod_price: +prod_price,
    updated_at: Date.now()
  };

  db.products.push(productToCreate);
  saveDbData(db);
  return res.status(200).json(productToCreate);
});

server.listen(PORT, () => console.log('Running mock api on localhost:3005...'));
