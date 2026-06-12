import { Page, Locator } from "playwright-core";
export class ProductPage{
    private page: Page;
    private productTitle: Locator;
      private Addtocart: Locator;
        private shopcartpage: Locator;

    constructor(page: Page){
        this.page=page;
        this.productTitle=page.locator('.title');
        this.Addtocart=page.locator("#add-to-cart-sauce-labs-backpack");
        this.shopcartpage=page.locator(".shopping_cart_link");


    }

    async getProductTitle(): Promise<string> {
        const title = await this.productTitle.textContent();
        return title ?? "";
    }

    async addToCart(): Promise<void> {
        await this.Addtocart.click();
    }
    async goToCartPage(): Promise<void> {
        await this.shopcartpage.click();
    }
}