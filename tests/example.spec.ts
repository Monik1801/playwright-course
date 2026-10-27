import { test, expect } from '@playwright/test';
import { Users, PaymentData} from './data';
import { AccountPage } from './AccountPage';


 test('test caso cvv', async ({ page}) => {
  test.setTimeout(90000);
  page.setDefaultTimeout(10000);
  
 

 const accountPage = new AccountPage(page);

  // Paso 1: Iniciar el navegador
  // Paso 2: Navegar a la página de inicio

  await page.goto('https://www.automationexercise.com//');

 // Paso 3: Verificar que la página de inicio se visualice correctamente
 await expect(page).toHaveTitle(/Automation Exercise/);
  
  // Paso 4: Hacer clic en Signup / Login
 //await page.getByRole('link', { name: 'Signup / Login' }).click();
 ///Paso 5: Introduce tu correo electrónico y contraseña y haz clic en el botón 'Iniciar sesión'

 await accountPage.login( Users.ValidUser.email,
  Users.ValidUser.password);

 // Paso 6: Verificar que el usuario inició sesión
  await expect(page.getByText(/Logged in as/)).toBeVisible();

 
  // Paso 7 Agregar  producto

 await page.locator('a[data-product-id="1"]').first().click();
 await page.locator('#cartModal').waitFor({ state: 'visible' });
 await page.locator('#cartModal button.close-modal:visible').click();
 await expect(page.locator('#cartModal')).toBeHidden();

 


  // Paso 8: Entrar al carrito desde el menú
  await page.locator('a[href="/view_cart"]').first().click({ noWaitAfter: true });

  // Paso 9: Verificar que se muestra el carrito
  await expect(page).toHaveURL(/view_cart/);

  // Paso 10: Continuar al checkout
  await page.locator('a.check_out').click();

  // Paso 11: Verificar los datos de dirección y el pedido
  await expect(page.getByText(/Address Details/i)).toBeVisible();
  await expect(page.getByText(/Review Your Order/i)).toBeVisible();

  // Paso 12: Escribir un comentario y realizar el pedido
  await page.locator('textarea[name="message"]').fill('Pedido de prueba');
  

 

  // Paso 13: Hacer clic en Place Order
   
await page.locator('a[href="/payment"]').click();

console.log('URL actual:', page.url());

await page.screenshot({
  path: 'pantalla-pago.png',
  fullPage: true
});

await expect(
  page.locator('[data-qa="name-on-card"]')
).toBeVisible({ timeout: 15000 });


  

  // Ingresar los datos de pago
  await page.locator('[data-qa="name-on-card"]').fill(PaymentData.nameOnCard);
  await page.locator('[data-qa="card-number"]').fill(PaymentData.cardNumber);
  await page.locator('[data-qa="cvc"]').fill('')
  await page.locator('[data-qa="expiry-month"]').fill(PaymentData.expiryMonth);
  await page.locator('[data-qa="expiry-year"]').fill(PaymentData.expiryYear);

// Paso 14: Confirmar el pago
  await page.locator('[data-qa="pay-button"]').click();

  // Paso 15: Verificar la confirmación del pedido
  await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();

  



});