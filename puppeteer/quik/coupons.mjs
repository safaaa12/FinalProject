import { productsFromUrl } from "../allSupers/helpers.mjs"

export const quikCoupons = async (browser, page) => {
    const url = `https://quik.co.il/products/%D7%9E%D7%91%D7%A6%D7%A2%D7%99%D7%9D`
    const productSelector = ".product_Vun.sale_XjM";
    const selectors = {
        productDescriptionSelector: ".name__7t",
        productImageSelector: ".imageWrapper_XN8 img",
        productPriceTextSelector: " .promotionSumWrapper_A6f ",
    };
    const products = await productsFromUrl(browser, page, url, productSelector, selectors);
    return products;
}