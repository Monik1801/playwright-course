
import { type Page, expect } from '@playwright/test';

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
   // Entrar a la página de registro
  async abrirRegistro() {
    await this.page.getByRole('link', { name: 'Signup / Login' }).click();
  }

  // Escribir el nombre y correo para comenzar el registro
  async comenzarRegistro(name: string, email: string) {
    await this.page.locator('[data-qa="signup-name"]').fill(name);
    await this.page.locator('[data-qa="signup-email"]').fill(email);
    await this.page.locator('[data-qa="signup-button"]').click();
  }

  // Completar los datos personales y la dirección
  async completarRegistro(datos: {
    password: string;
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }) {
    await this.page.locator('#id_gender1').check();
    await this.page.locator('[data-qa="password"]').fill(datos.password);
    await this.page.locator('[data-qa="days"]').selectOption('1');
    await this.page.locator('[data-qa="months"]').selectOption('1');
    await this.page.locator('[data-qa="years"]').selectOption('2000');

    await this.page.locator('[data-qa="first_name"]').fill(datos.firstName);
    await this.page.locator('[data-qa="last_name"]').fill(datos.lastName);
    await this.page.locator('[data-qa="company"]').fill(datos.company);
    await this.page.locator('[data-qa="address"]').fill(datos.address1);
    await this.page.locator('[data-qa="address2"]').fill(datos.address2);
    await this.page.locator('[data-qa="country"]').selectOption({ label: datos.country });
    await this.page.locator('[data-qa="state"]').fill(datos.state);
    await this.page.locator('[data-qa="city"]').fill(datos.city);
    await this.page.locator('[data-qa="zipcode"]').fill(datos.zipcode);
    await this.page.locator('[data-qa="mobile_number"]').fill(datos.mobileNumber);

    await this.page.locator('[data-qa="create-account"]').click();
  }

  // Verificar que la cuenta se haya creado
  async validarCuentaCreada() {
    await expect(
      this.page.getByText('Account Created!', { exact: true })
    ).toBeVisible();
  }

  // Continuar después de crear la cuenta
  async continuarDespuesDelRegistro() {
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }

  // Verificar que la sesión esté iniciada con el usuario esperado
  async validarSesionIniciada(name: string) {
    await expect(this.page.getByText(`Logged in as ${name}`)).toBeVisible();
  }


}
