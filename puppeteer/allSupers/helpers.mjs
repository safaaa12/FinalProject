export const navigateToUrl = async (page, url) => {
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 300000 });
  } catch (error) {
    console.error("Failed to load page:", error);
    throw error;
  }
};

const collectProducts = async (page, productSelector, selectors) => {
  return await page.evaluate((productSelector, selectors) => {
    const productElements = document.querySelectorAll(productSelector);
    let products = [];
    // debugger;
    productElements.forEach(productElement => {
      console.log("productElement {}", productElement);
      let product = {};
      for (const [fullSelectorName, selector] of Object.entries(selectors)) {
        const selectorName = fullSelectorName.toLowerCase().replace("product", "").replace("selector", "");
        try {
          if (selectorName == "image") {
            product[selectorName] = productElement.querySelector(selector).src;
          }
          else {
            product[selectorName] = productElement.querySelector(selector).innerText;
          }
        } catch { }
      }
      products.push(product);
    });
    return products;
  }, productSelector, selectors);
};

export const productsFromUrl = async (browser, page, url, productSelector, innerTextSelectors, srcSelectors) => {
  let products = [];
  try {
    await navigateToUrl(page, url);
    console.log(`Searched ${url}`);
    products = await collectProducts(page, productSelector, innerTextSelectors, srcSelectors);
  } catch (error) {
    console.error("Error:", error);
  }
  // finally {
  //   await page.close();
  //   await browser.close();
  //   console.log("Browser closed");
  // }
  return products;
}

