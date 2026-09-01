import { createAdminUserDetails } from "@models/Admin";
import { AdminConstant } from "@support/AdminConstant";
import { RolesFactor } from "@support/enum/Global";
import { expect, Locator, Page } from "playwright/test";

export class AdminPage {
    private page: Page;
    readonly userRoleDropdown: Locator;
    readonly dropdownLocator: (labelName: string) => Locator;

    constructor(page: Page) {
        this.page = page;

        this.userRoleDropdown = page.getByText("-- Select --");
        this.dropdownLocator = (labelName: string) => page.getByRole(RolesFactor.OPTION, { name: labelName });


    }

    //actons 

    /**
     * This method Create Admin User
     * @param adminDetails 
     */
    async createAdminUser(adminDetails: createAdminUserDetails) {
        await this.userRoleDropdown.first().click();
        await this.dropdownLocator(adminDetails.userRole).click();
        await this.page.getByPlaceholder(AdminConstant.EMPLOYEE_NAME_INPUT).fill(adminDetails.empName);
        await this.userRoleDropdown.last().click();
        await this.dropdownLocator(adminDetails.status).click();
    }

    //verifications

    /**
     * Verifies the top menues on admin page
     * @param menus 
     */
    async verifyAdminPageTabs(menus: string[]) {
        await this.page.waitForLoadState();
        for (let menu of menus) {
            await expect(this.page.getByText(menu).first()).toBeVisible();
        }
    }
}