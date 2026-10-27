
import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  readonly deliveryAddressSection: Locator;
  readonly billingAddressSection: Locator;

  constructor(page: Page) {
    super(page);
    this.deliveryAddressSection = page.locator("#address_delivery");
    this.billingAddressSection = page.locator("#address_invoice");
  }

  async validarDetalleDeliveryAddress(firstName: string): Promise<void> {
    const firstnamePage =
      await this.deliveryAddressSection
        .locator(".address_firstname")
        .textContent() || "";

    await expect(firstnamePage.trim()).toBe(firstName);
  }
}
