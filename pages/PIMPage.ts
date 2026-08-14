import { expect, Locator, Page } from "@playwright/test";
import { RolesFactor } from "@support/enum/Global";
import { PIMConstant } from "@support/PIMConstant";

export class PIMPage {
  private page: Page;

  readonly pimLink: (option: string) => Locator;
  readonly addButton: (buttonName: string) => Locator;
  readonly firstName: Locator;
  readonly middleName: Locator;
  readonly lastName: Locator;
  readonly employeeId: Locator;
  readonly deleteButtonPopup : Locator ;
  readonly deleteButton : Locator ;

  constructor(page: Page) {
    this.page = page;

    //Locators
    this.pimLink = (option: string) =>
      page.getByRole(RolesFactor.LINK, { name: option });
    this.addButton = (buttonName: string) =>
      page.getByRole(RolesFactor.BUTTON, { name: buttonName });
    this.firstName = page.getByPlaceholder(PIMConstant.FIRST_NAME);
    this.middleName = page.getByPlaceholder(PIMConstant.MIDDLE_NAME);
    this.lastName = page.getByPlaceholder(PIMConstant.LAST_NAME);
    this.employeeId = page.getByRole(RolesFactor.TEXT_BOX);
    this.deleteButtonPopup = page.getByRole(RolesFactor.BUTTON,{name : ' Yes, Delete '});
    this.deleteButton = page.getByRole(RolesFactor.ROW).getByRole(RolesFactor.CELL).locator(".oxd-icon.bi-trash");
    
  }

  /**
   * This method is use for click an option
   * @param option - option which need to be click
   */
  async clickOnOption(option: string) {
    await this.pimLink(option).click();
    await this.page.waitForLoadState();
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
   * Add PIM Employee details
   * @param firstName 
   * @param middleName 
   * @param lastName 
   * @param empId 
   */
  async addEmployeeDetails(
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
  async deletePIMEmployee(){
    await this.deleteButton.click();
    await this.deleteButtonPopup.click();
  }

  // verifications
  /**
   * Verify success notification
   */
  async verifySuccessNotification() {
    await this.page.getByText("Success").first().waitFor();
    await expect(this.page.getByText("Success").first()).toBeVisible();
  }

  /**
   * Verify employee details
   * @param empName 
   */
  async verifyEmployeeDetails(empName : string){
    await this.page.waitForLoadState();
    await expect(this.page.getByRole(RolesFactor.ROW,{name:empName})).toBeVisible();
  }

   async verifyDeleteUserNotification() {
    await this.page.getByText("Successfully Deleted").first().waitFor();
    await expect(this.page.getByText("Successfully Deleted").first()).toBeVisible();
  }
}
