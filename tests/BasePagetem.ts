
import { expect, type Locator, type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async abrirPagina(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async accederAutoPage(): Promise<void> {
    await this.abrirPagina('https://automationexercise.com/');
  }

  async validarAccesoAutoPageCorrecto(): Promise<void> {
    await expect(this.page).toHaveURL('https://automationexercise.com/');
    await expect(
      this.page.getByRole('img', {
        name: 'Website for automation practice',
      }),
    ).toBeVisible();
  }

  async validarDeleteAccountVisible(): Promise<void> {
    await expect(
      this.page.getByRole('link', { name: /Delete Account/i }),
    ).toBeVisible();
  }

  async irAlCarrito(): Promise<void> {
    await this.page.getByRole('link', { name: 'View Cart' }).click();
  }
}
