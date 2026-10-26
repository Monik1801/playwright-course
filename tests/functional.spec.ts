

import { test, expect } from '@playwright/test';
import { Users, PaymentData } from './data';
import { AccountPage } from './AccountPage';

test.describe('Caso de prueba 16 - Automation Exercise', () => {
  test('Place Order: Login before Checkout', async ({ page }) => {
    test.setTimeout(90000);
    page.setDefaultTimeout(10000);

    const accountPage = new AccountPage(page);

    await test.step('Pasos 1 al 3: abrir y verificar la página de inicio', async () => {
      await page.goto('https://www.automationexercise.com/');
      await expect(page).toHaveTitle(/Automation Exercise/);
    });

    await test.step('Pasos 4 al 6: iniciar sesión', async () => {
      await accountPage.login(
        Users.ValidUser.email,
        Users.ValidUser.password
      );

      await expect(page.getByText(/Logged in as/)).toBeVisible();
    });

    await test.step('Paso 7: agregar un producto al carrito', async () => {
      await page.locator('a[data-product-id="1"]').first().click();

      await page.locator('#cartModal').waitFor({ state: 'visible' });

      await page.locator('#cartModal button.close-modal:visible').click();

      await expect(page.locator('#cartModal')).toBeHidden();
    });

    await test.step('Pasos 8 y 9: abrir el carrito', async () => {
      await page.goto('https://www.automationexercise.com/view_cart');

      await expect(page).toHaveURL(/view_cart/);
    });

    await test.step('Pasos 10 al 12: checkout y comentario', async () => {
      await page.locator('a.check_out').click();

      await expect(page.getByText(/Address Details/i)).toBeVisible();
      await expect(page.getByText(/Review Your Order/i)).toBeVisible();

      await page.locator('textarea[name="message"]').fill('Pedido de prueba');
    });

    await test.step('Paso 13: abrir el formulario de pago', async () => {
      await page.locator('a[href="/payment"]').click();

      await expect(
        page.locator('[data-qa="name-on-card"]')
      ).toBeVisible();
    });

    await test.step('Ingresar los datos de la tarjeta con CVV vacío', async () => {
      await page.locator('[data-qa="name-on-card"]').fill(
        PaymentData.nameOnCard
      );

      await page.locator('[data-qa="card-number"]').fill(
        PaymentData.cardNumber
      );

      await page.locator('[data-qa="cvc"]').fill('');

      await page.locator('[data-qa="expiry-month"]').fill(
        PaymentData.expiryMonth
      );

      await page.locator('[data-qa="expiry-year"]').fill(
        PaymentData.expiryYear
      );

      await expect(
        page.locator('[data-qa="cvc"]')
      ).toHaveValue('');
    });


await test.step('Intentar pagar con CVV vacío', async () => {
  const cvc = page.locator('[data-qa="cvc"]');

  await cvc.fill('');

  await expect(cvc).toHaveJSProperty('required', true);
  await expect(cvc).toHaveJSProperty('validity.valid', false);

  await page.locator('[data-qa="pay-button"]').click();

   await expect(page).not.toHaveURL(/payment_done/);
   
});


   



  });
});
