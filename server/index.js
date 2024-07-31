require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
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

// Ensure the product_images directory exists
const productImagesDir = path.join(__dirname, 'product_images');
if (!fs.existsSync(productImagesDir)) {
    fs.mkdirSync(productImagesDir);
}
app.use('/product_images', express.static(productImagesDir));

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

//recipes routes
app.use("/api/recipe", recipeRoutes);
app.use("/api/recipes", recipesRoutes);

// פונקציה לקריאת כל קבצי ה-JSON מהתיקייה
const readJsonFiles = (directory) => {
    console.log(`Reading JSON files from directory: ${directory}`);
    const files = fs.readdirSync(directory);
    let products = [];
    files.forEach(file => {
        console.log(`Reading file: ${file}`);
        const data = fs.readFileSync(path.join(directory, file), 'utf8');
        const json = JSON.parse(data);
        console.log(`JSON data: ${JSON.stringify(json)}`);
        if (json.root && json.root.Items && json.root.Items.Item) {
            products = products.concat(json.root.Items.Item);
        }
    });
    console.log(`Total products read: ${products.length}`);
    return products;
};

// נתיב לחיפוש מוצרים
app.get('/api/search', (req, res) => {
  const query = req.query.q.toLowerCase();
  console.log(`Search query received: ${query}`);
  const products = readJsonFiles(path.join(__dirname, 'json_files_directory')); // ודא שהתיקייה נכונה
  const results = products
      .filter(product => product.ItemName.toLowerCase().includes(query))
      .sort((a, b) => parseFloat(a.ItemPrice) - parseFloat(b.ItemPrice)); // מיון לפי מחיר מהנמוך לגבוה
  console.log(`Number of results: ${results.length}`);
  res.json(results);
});

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
// Products routes
app.get('/api/product/:id', (req, res) => {
  // Implement your logic here
});

// Cart routes
app.get('/api/cart', (req, res) => {
  // Implement your logic here
});
app.post('/api/cart/add', (req, res) => {
  // Implement your logic here
});
app.post('/api/cart/remove', (req, res) => {
  // Implement your logic here
});
app.post('/api/cart/checkout', (req, res) => {
  // Implement your logic here
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
