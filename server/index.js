require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const connection = require("./db");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const userRoutes = require("./routes/user");
const articleRoutes = require("./routes/article");
const articlesRoutes = require("./routes/articles");
const recipeRoutes = require("./routes/recipe");
const recipesRoutes = require("./routes/recipes");
const passwordResetRoutes = require("./routes/passwordReset");
const contactRoutes = require("./routes/contact");
const fs = require('fs');

// database connection
connection();

// middlewares
const app = express();
app.use(express.json());
app.use(cors());
// Ensure the message-uploads directory exists
const uploadDir = path.join(__dirname, 'message-uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/message-uploads', express.static(uploadDir));

// contact routes
app.use("/api/contact", contactRoutes);

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);

// Users routes
app.use("/api/users", usersRoutes);
app.use("/api/user", userRoutes);

//articles routes
app.use("/api/article", articleRoutes);
app.use("/api/articles", articlesRoutes);

//articles routes
app.use("/api/recipe", recipeRoutes);
app.use("/api/recipes", recipesRoutes);

// Products routes
app.get('/api/coupons', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3002/coupons', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
    res.json(response.data);
  }
  catch (error) {
    console.error("Error during search:", error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Products routes
app.post('/api/search', async (req, res) => {
  try {
    console.log(req.body)
    const searchQueries = req.body.products;
    if (!searchQueries || searchQueries.length === 0) {
      return res.status(400).send({ message: 'No search queries provided' });
    }
    const response = await axios.post('http://localhost:3002/search', req.body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// ProductsList routes
app.post('/api/productsList', async (req, res) => {
  try {
    console.log(req.body);
    const searchQueries = req.body.products;
    if (!searchQueries || searchQueries.length === 0) {
      return res.status(400).send({ message: 'No search queries provided' });
    }

    const response = await axios.post('http://localhost:3002/search', req.body, {
      headers: { 'Content-Type': 'application/json' }
    });

    const sources = {};

    for (const [key, value] of Object.entries(response.data)) {
      const productOptions = value;
      const productName = key;

      for (let i = 0; i < productOptions.length; i++) {
        const option = productOptions[i];
        const source = option.source;

        if (!(source in sources)) {
          sources[source] = {};
        }

        if (!(productName in sources[source])) {
          sources[source][productName] = option;
          sources[source][productName].price = parseFloat(option.price.replace(/[^0-9.-]+/g, ""));
        }
      }
    }

    let sourceToPrice = {};

    for (const [key, value] of Object.entries(sources)) {
      let priceSum = 0; // להגדיר כמשתנה לוקאלי בלולאה
      for (const product of Object.values(value)) {
        priceSum += product.price; // הוספת המחירים לסכום הכולל
      }

      console.log(`Basket from ${key} costs ${priceSum} shekels.`);
      sourceToPrice[key] = priceSum; // שמירת הסכום הכולל למקור
    }

    const [cheapestSource, cheapestPrice] = Object.entries(sourceToPrice).reduce((acc, [source, price]) => {
      return (acc[1] > price) ? [source, price] : acc;
    }, ['', Infinity]); // חיפוש המקור עם המחיר הכולל הנמוך ביותר

    console.log(`The cheapest basket comes from ${cheapestSource} and costs ${cheapestPrice} shekels.`);

    // שליחת התוצאה חזרה ללקוח
    res.json({
      sourcesProducts: sources,
      sourcesPrices: sourceToPrice,
      cheapestSource: cheapestSource,
      cheapestPrice: cheapestPrice
    });

  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).send({ message: 'Internal server error' });
  }
});



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
