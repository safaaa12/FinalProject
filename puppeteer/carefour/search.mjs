const carefourSearch = async (browser, page, searchQueries) => {
    try {
        for (const searchQuery of searchQueries) {
            const url = `https://www.carrefour.co.il/search/${encodeURIComponent(searchQuery)}`;
            await navigateToUrl(page, url);
            console.log(`Searched for ${searchQuery} at ${url}`);
            const products = await collectProducts(page);
            console.log(products);
            return products;
        }
        await page.close();
        await browser.close();
        console.log("Browser closed");
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

const navigateToUrl = async (page, url) => {
    try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 300000 });
    } catch (error) {
        console.error("Failed to load page:", error);
        throw error;
    }
};

const collectProducts = async (page) => {
    return await page.evaluate(() => {
        const productElements = document.querySelectorAll('.product-item clickable');
        const products = [];
        productElements.forEach(el => {
            const nameEl = el.querySelector('.product_name.name');
            const priceEl = el.querySelector('.price');
            const brandEl = el.querySelector('.brand');
            const unitEl = el.querySelector('.weight');
            const imageEl = el.querySelector('.image');

            if (!nameEl || !priceEl || !brandEl || !unitEl || !imageEl) {
                return;
            }
            const name = nameEl.innerText;
            const image = imageEl.src;
            const brand = brandEl.innerText;
            const unit = unitEl.innerText.replace(/[^\d.\/]+/g, '').trim();
            const price = priceEl.innerText.trim();

            products.push({ name, price, brand, unit, image, source: 'carefour' });
        });
        return products;
    });
};

export { carefourSearch };