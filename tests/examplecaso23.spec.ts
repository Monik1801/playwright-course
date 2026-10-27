
import { test, expect } from '@playwright/test';
import { AccountPage } from './AccountPage';
import { RegistrationData } from './data';

 test('test case 23', async ({ page}) => {
  test.setTimeout(90000);
  page.setDefaultTimeout(10000);

    const accountPage = new AccountPage(page);

    // Paso 1 y 2: abrir la página
    await page.goto('https://automationexercise.com');

    // Paso 3: verificar que la página principal cargó
    await expect(page).toHaveTitle(/Automation Exercise/);

    // Paso 4: entrar al registro
    await accountPage.abrirRegistro();

    // Paso 5: ingresar nombre y correo
    await accountPage.comenzarRegistro(
      RegistrationData.name,
      RegistrationData.email
    );

    // Completar el formulario y crear la cuenta
    await accountPage.completarRegistro(RegistrationData);

    // Paso 6: verificar cuenta creada y continuar
    await accountPage.validarCuentaCreada();
    await accountPage.continuarDespuesDelRegistro();

    // Paso 7: verificar que la sesión esté iniciada
    await accountPage.validarSesionIniciada(RegistrationData.name);

    // Paso 8: agregar un producto al carrito
    await page.locator('a[data-product-id="1"]').first().click();
    await expect(page.locator('#cartModal')).toBeVisible();
    await page.locator('#cartModal button.close-modal:visible').click();

    // Paso 9: abrir el carrito
    await page.getByRole('link', { name: 'Cart' }).click();

    // Paso 10: verificar que se muestra el carrito
    await expect(page).toHaveURL(/view_cart/);
    await expect(page.locator('#cart_info')).toBeVisible();

    // Paso 11: proceder al pago
    await page.locator('a.check_out').click();

    // Paso 12: verificar la dirección de entrega
    const delivery = page.locator('#address_delivery');
    await expect(delivery).toContainText(RegistrationData.firstName);
    await expect(delivery).toContainText(RegistrationData.lastName);
    await expect(delivery).toContainText(RegistrationData.address1);
    await expect(delivery).toContainText(RegistrationData.city);
    await expect(delivery).toContainText(RegistrationData.zipcode);

    // Paso 13: verificar la dirección de facturación
    const billing = page.locator('#address_invoice');
    await expect(billing).toContainText(RegistrationData.firstName);
    await expect(billing).toContainText(RegistrationData.lastName);
    await expect(billing).toContainText(RegistrationData.address1);
    await expect(billing).toContainText(RegistrationData.city);
    await expect(billing).toContainText(RegistrationData.zipcode);

    // Paso 14: eliminar la cuenta
    await page.getByRole('link', { name: 'Delete Account' }).click();

    // Paso 15: verificar que la cuenta fue eliminada
    await expect(page.getByText('Account Deleted!', { exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
  });

