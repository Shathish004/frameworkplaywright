
import { test } from '../fixtures/fixture';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/Product';


test('add to cart Page', async ({page, aunthenticatedPage}) => {

    aunthenticatedPage;

    const product= new ProductPage(page);
   await expect(await product.getProductTitle()).toBe("Products");

})