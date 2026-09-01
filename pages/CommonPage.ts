import { RolesFactor } from "@support/enum/Global";
import { expect, Locator, Page } from "playwright/test";

export class CommonPage {
    private page: Page;
    readonly linkLocator: (option: string) => Locator;

    constructor(page: Page) {
        this.page = page;
        this.linkLocator = (option: string) =>
            page.getByRole(RolesFactor.LINK, { name: option });
    }

    //actions method

    /**
      * This method is use for click an option
      * @param option - option which need to be click
      */
    async clickOnOption(option: string) {
        await this.linkLocator(option).click();
        await this.page.waitForLoadState();
    }

    //verifications

    /**
     * Verify success notification
     */
    async verifySuccessNotification() {
        await this.page.getByText("Success").first().waitFor();
        await expect(this.page.getByText("Success").first()).toBeVisible();
    }


}