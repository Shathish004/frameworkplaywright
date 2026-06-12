import {test,expect} from '@playwright/test'
import fs from 'fs'

test('download files', async ({page})=> {

    await page.goto('https://testautomationpractice.blogspot.com/p/download-files_25.html');
    await page.locator('#inputText').fill('welcomme');
    await page.locator('#generateTxt').click();

    const [download] = await Promise.all([

        page.waitForEvent('download'),
        page.locator('#txtDownloadLink').click()
    ])

    const downloadpath = 'downloads/testfile.txt'
    download.saveAs(downloadpath);

    const fileexist = fs.existsSync(downloadpath)
    expect(fileexist).toBe(true);
    await page.waitForTimeout(5000);
});
