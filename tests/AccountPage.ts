
import { type Page } from '@playwright/test';


export class AccountPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(email: string, password: string) {
    await this.page.getByRole('link', { name: 'Signup / Login' }).click();
    await this.page.locator('[data-qa="login-email"]').fill(email);
    await this.page.locator('[data-qa="login-password"]').fill(password);
    await this.page.locator('[data-qa="login-button"]').click();
  }
}
