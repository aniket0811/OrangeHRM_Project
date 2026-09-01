import { expect, Locator, Page } from "@playwright/test";
import { RolesFactor } from "@support/enum/Global";
import { PIMConstant } from "@support/PIMConstant";

export class PIMPage {
  private page: Page;


  readonly addButton: (buttonName: string) => Locator;
  readonly deleteButton: Locator;
  readonly deleteButtonPopup: Locator;
  readonly employeeId: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly middleName: Locator;

  constructor(page: Page) {
    this.page = page;

    //Locators

    this.addButton = (buttonName: string) =>
      page.getByRole(RolesFactor.BUTTON, { name: buttonName });
    this.deleteButton = page.getByRole(RolesFactor.ROW).getByRole(RolesFactor.CELL).locator(".oxd-icon.bi-trash");
    this.deleteButtonPopup = page.getByRole(RolesFactor.BUTTON, { name: ' Yes, Delete ' });
    this.employeeId = page.getByRole(RolesFactor.TEXT_BOX);
    this.firstName = page.getByPlaceholder(PIMConstant.FIRST_NAME);
    this.lastName = page.getByPlaceholder(PIMConstant.LAST_NAME);
    this.middleName = page.getByPlaceholder(PIMConstant.MIDDLE_NAME);

  }

  /**
   * Click on button
   * @param buttonName - button which needs to be click
   */
  async clickOnButton(buttonName: string) {
    await this.addButton(buttonName).click();
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Create PIM Employee details
   * @param firstName 
   * @param middleName 
   * @param lastName 
   * @param empId 
   */
  async createEmployeeDetails(
    firstName: string,
    middleName: string,
    lastName: string,
    empId: number
  ) {
    await this.page.waitForLoadState();
    await this.firstName.fill(firstName);
    await this.middleName.fill(middleName);
    await this.lastName.fill(lastName);
    await this.employeeId.last().clear();
    await this.employeeId.last().fill(empId.toString());
  }

  async searchEmployee(empId: string) {
    await this.employeeId.nth(2).fill(empId);
    await this.page.waitForLoadState("networkidle");
  }

  /**
  * Delete PIM Employee
  */
  async deletePIMEmployee() {
    await this.deleteButton.click();
    await this.deleteButtonPopup.click();
  }

  // verifications


  /**
   * Verify employee details
   * @param empName 
   */
  async verifyEmployeeDetails(empName: string) {
    await this.page.waitForLoadState();
    await expect(this.page.getByRole(RolesFactor.ROW, { name: empName })).toBeVisible();
  }

  async verifyDeleteUserNotification() {
    await this.page.getByText("Successfully Deleted").first().waitFor();
    await expect(this.page.getByText("Successfully Deleted").first()).toBeVisible();
  }
}
