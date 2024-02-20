require("dotenv").config();
const axios = require("axios");
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const usersRoutes = require("./routes/users");
const userRoutes = require("./routes/user");


// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());



// Users routes
app.use("/api/users", usersRoutes);
app.use("/api/user", userRoutes);

// Products routes
app.get('/api/products', async (req, res) => {
  // a product list with: Name, Price, Description, Availablity, Ratings, Deals, Cheapest stores near by
  const url = "https://simple-grocery-store-api.glitch.me/products"
  const response = await axios.get(url);
  response.data.forEach(product => {
    product.price = 100
    product.location = 12312414
  });
  res.send(response.data);
})

app.get('/api/product/{id}', async (req, res) => {
  // a product with: Name, Price, Description, Availablity, Ratings, Deals, Cheapest stores near by
})

// Cart routes
app.get('/api/cart', async (req, res) => {
  // a list of items in the cart
})
app.post('/api/cart/add', async (req, res) => {
  // add an item to the cart
})
app.post('/api/cart/remove', async (req, res) => {
  // remove an item from the cart
})
app.post('/api/cart/checkout', async (req, res) => {
  // checkout the cart
})

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}...`));
