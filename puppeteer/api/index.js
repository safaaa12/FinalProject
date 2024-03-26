import express from 'express';
//import { carefourSearch } from '../carefour/search.mjs'
import { shufersalSearch } from '../shufersal/search.mjs'
//import{ quikSearch } from '../quik/search.mjs'
import { Puppeteer } from '../browser.mjs';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const { browser, page } = await Puppeteer();

app.post('/search', async (req, res) => {
    try {
        const searchQueries = req.body.products
        if (!searchQueries || searchQueries.length === 0) {
            return res.status(400).send({ message: 'No search queries provided' });
        }
        let resultsByQuery = {};
        for (let query of searchQueries) {
            //const quikProducts = await quikSearch(browser, page, [query]);
            //const carefourProducts = await carefourSearch(browser, page, [query]);
            const shufersalProducts = await shufersalSearch(browser, page, [query]);
            const combinedProducts = [...shufersalProducts];
            const sortedProducts = combinedProducts.sort((a, b) => {
                const priceA = parseFloat(a.price);
                const priceB = parseFloat(b.price);
                return priceA - priceB;
            });

            resultsByQuery[query] = sortedProducts;
        }
        res.json(resultsByQuery);
    } catch (error) {
        console.error("Error during search:", error);
        res.status(500).send({ message: 'Internal server error' });
    }
});


app.get('/health', (req, res) => res.send({ status: 'ok' }));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
