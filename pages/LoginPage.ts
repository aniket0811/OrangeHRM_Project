import { expect, Locator, Page } from "@playwright/test";

export class LoginPage{
  private page : Page;
  readonly userNameInput : Locator; //we cannot reassign the value of readonly variable
  readonly passwordInput : Locator;
  readonly loginButton : Locator;

  constructor(page : Page){
    this.page = page

    //Locators for Login Page
        this.userNameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder("Password");
        this.loginButton = page.getByRole('button',{name:' Login '});
  }

/**
 * Login to application
 * @param userName - username
 * @param password -password
 */
  async loginPage(userName : string,password : string){
    await this.page.waitForLoadState();
    await this.userNameInput.fill(userName);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
    console.log("******Login Successful*****");
  }

  async closeBrowser(){
    await this.page.close();
  }


}