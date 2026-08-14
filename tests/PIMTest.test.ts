import { LoginPage } from "@pages/LoginPage";
import { PIMPage } from "@pages/PIMPage";
import { test } from "@playwright/test";
import { PIMConstant } from "@support/PIMConstant";
import * as allure from 'allure-js-commons';

test.describe("PIM User functionality flow", async () => {
  let loginPage: LoginPage;
  let pimPage: PIMPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    pimPage = new PIMPage(page);

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
    await pimPage.clickOnOption(PIMConstant.PIM_OPTION);
    await pimPage.clickOnButton(PIMConstant.ADD_BUTTON);
    await pimPage.addEmployeeDetails(
      firstName,
      middleName,
      lastName,
      empId
    );
    await pimPage.clickOnButton(PIMConstant.SAVE_BUTTON);
    await pimPage.verifySuccessNotification();

    //Search created employee
    await pimPage.clickOnOption(PIMConstant.PIM_OPTION);
    await pimPage.searchEmployee(empId.toString());
    await pimPage.clickOnButton(" Search ");
    await pimPage.verifyEmployeeDetails(firstName);
    // Delete PIM Employee
    await pimPage.deletePIMEmployee();
    await pimPage.verifyDeleteUserNotification();

  });


  test.afterEach(async () => {
    await loginPage.closeBrowser();
  });
});
