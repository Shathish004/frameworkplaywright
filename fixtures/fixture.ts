import {test as BaseTest} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export const test = BaseTest.extend<{aunthenticatedPage:LoginPage}>({

    aunthenticatedPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.visitloginPage();
        await loginPage.login("standard_user", "secret_sauce");
        await use(loginPage);
    }
})