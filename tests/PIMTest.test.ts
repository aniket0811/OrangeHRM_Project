import { CreateAdminUser } from "@data/AdminData";
import { AdminPage } from "@pages/AdminPage";
import { CommonPage } from "@pages/CommonPage";
import { LoginPage } from "@pages/LoginPage";
import { PIMPage } from "@pages/PIMPage";
import { test } from "@playwright/test";
import { AdminConstant } from "@support/AdminConstant";
import { PIMConstant } from "@support/PIMConstant";
import * as allure from 'allure-js-commons';

test.describe("PIM User functionality flow", async () => {
  let loginPage: LoginPage;
  let pimPage: PIMPage;
  let adminPage : AdminPage;
  let commonPage : CommonPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    pimPage = new PIMPage(page);
    adminPage = new AdminPage(page);
    commonPage = new CommonPage(page);

    await page.goto("/");
  });

  test("@TC002 Add an PIM employee", async () => {
    await allure.epic('OrangeHRM');
    await allure.feature('PMI User feature');

    const firstName = `Auto_First_Name_${Math.floor(Math.random() * 100000)}`;
    const middleName = `Auto_Middle_Name_${Math.floor(Math.random() * 100000)}`;
    const lastName = `Auto_Last_Name_${Math.floor(Math.random() * 100000)}`;
    const empId = Number(Math.floor(Math.random() * 100000));

    await loginPage.loginPage(process.env.ADMIN!, process.env.PASSWORD!);
    await commonPage.clickOnOption(PIMConstant.PIM_OPTION);
    await pimPage.clickOnButton(PIMConstant.ADD_BUTTON);
    await pimPage.createEmployeeDetails(
      firstName,
      middleName,
      lastName,
      empId
    );
    await pimPage.clickOnButton(PIMConstant.SAVE_BUTTON);
    await commonPage.verifySuccessNotification();

    //Search created employee
    await commonPage.clickOnOption(PIMConstant.PIM_OPTION);
    await pimPage.searchEmployee(empId.toString());
    await pimPage.clickOnButton(" Search ");
    await pimPage.verifyEmployeeDetails(firstName);
    // Delete PIM Employee
    await pimPage.deletePIMEmployee();
    await pimPage.verifyDeleteUserNotification();

  });

  test("@TC003 Admin Flow",async()=>{
    await loginPage.loginPage(process.env.ADMIN!, process.env.PASSWORD!);
    await commonPage.clickOnOption(AdminConstant.ADMIN_OPTION);
    await adminPage.verifyAdminPageTabs(AdminConstant.ADMIN_PAGE_MENUES);
    await pimPage.clickOnButton(AdminConstant.ADD_BUTTON);
    await adminPage.createAdminUser(CreateAdminUser);
    await pimPage.clickOnButton(PIMConstant.SAVE_BUTTON);
    //await commonPage.verifySuccessNotification(); 
  });

  test.afterEach(async () => {
    await loginPage.closeBrowser();
  });
});
