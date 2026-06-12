import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login Page', async ({page}) => {

    const loginPage = new LoginPage(page);
    
   await loginPage.visitloginPage();
   await loginPage.login("standard_user", "secret_sauce");
//     await loginPage.enterUsername("standard_user");
//    await  loginPage.enterPassword("secret_sauce");
//     await loginPage.clickLoginButton();

})
