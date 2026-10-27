# Proyecto de Automatización de Pruebas con Playwright

## 1. Descripción del proyecto

Este proyecto tiene como objetivo automatizar casos de prueba funcionales sobre la página [Automation Exercise](https://www.automationexercise.com/), utilizando Playwright y TypeScript.

Las pruebas permiten evaluar el registro de usuarios, el inicio de sesión, el proceso de compra, la información de las direcciones y el comportamiento del formulario de pago ante un CVV corto.

## 2. Tecnologías utilizadas

- **Playwright:** herramienta para automatizar pruebas de aplicaciones web.
- **TypeScript:** lenguaje utilizado para escribir los scripts de automatización.
- **Node.js y npm:** entorno para ejecutar las pruebas y administrar las dependencias.
- **Visual Studio Code:** editor utilizado para desarrollar y ejecutar el proyecto.

## 3. Casos de prueba automatizados

### Caso 16. Place Order: Login before Checkout

**Objetivo:** verificar el proceso de compra cuando el usuario inicia sesión antes de continuar al checkout.

**Pasos ejecutados:**

1. Abrir la página principal de Automation Exercise.
2. Verificar que la página se cargue correctamente.
3. Ingresar a la opción Signup / Login.
4. Iniciar sesión con las credenciales de un usuario existente.
5. Verificar que la sesión esté iniciada.
6. Agregar un producto al carrito.
7. Acceder al carrito de compras.
8. Continuar al checkout.
9. Verificar la información de las direcciones y del pedido.
10. Ingresar un comentario.
11. Acceder al formulario de pago.
12. Ingresar los datos de la tarjeta.
13. Confirmar el pago.
14. Verificar el mensaje de compra confirmada.
15. Eliminar la cuenta y verificar el resultado.

**Resultado esperado:** el usuario puede completar el proceso de compra y visualizar la confirmación del pedido. Posteriormente, la cuenta se elimina correctamente.

### Caso 23. Registro de usuario y verificación de direcciones

**Objetivo:** verificar el registro de una nueva cuenta, la compra de un producto y la información de las direcciones asociadas al pedido.

**Pasos ejecutados:**

1. Abrir la página principal.
2. Verificar que la página se cargue correctamente.
3. Ingresar a Signup / Login.
4. Introducir el nombre y el correo electrónico para comenzar el registro.
5. Completar los datos personales y la dirección.
6. Crear la cuenta y verificar el mensaje de confirmación.
7. Continuar y verificar que la sesión esté iniciada.
8. Agregar un producto al carrito.
9. Ingresar al carrito de compras.
10. Continuar al checkout.
11. Verificar la dirección de entrega.
12. Verificar la dirección de facturación.
13. Eliminar la cuenta y verificar el mensaje de confirmación.

**Resultado esperado:** la cuenta se crea correctamente, el producto se agrega al carrito, las direcciones de entrega y facturación muestran los datos registrados y la cuenta se elimina al finalizar.

### Caso de prueba 3. Pago con CVV vacío

**Objetivo:** evaluar el comportamiento del formulario de pago al intentar realizar una compra dejando el campo CVV vacío.

**Pasos ejecutados:**

1. Abrir la página principal de Automation Exercise.
2. Iniciar sesión con un usuario existente.
3. Agregar un producto al carrito.
4. Acceder al checkout.
5. Ingresar los datos de la tarjeta, dejando el campo CVV vacío.
6. Intentar realizar el pago.
7. Verificar si se muestra el mensaje de confirmación de compra.

**Resultado esperado:** el pago no debe completarse cuando el campo CVV está vacío y no debe mostrarse el mensaje *“Congratulations! Your order has been confirmed!”*.

**Resultado obtenido:** la compra no se completó y Playwright generó un error al no encontrar el mensaje *“Congratulations! Your order has been confirmed!”*, por lo que no se cumplió la condición de confirmación de compra.

## 4. Estructura del proyecto

Una posible estructura de los archivos utilizados es la siguiente:

```text
proyecto-automatizacion/
├── tests/
│   ├── data.ts
│   ├── AccountPage.ts
│   ├── functional.spec.ts
│   ├── examplecaso23.spec.ts
│   ├── example ccv.spec.ts
├── playwright.config.ts
├── package.json
└── README.md
```

- `data.ts`: contiene los datos de prueba, como usuarios y datos de pago.
- `AccountPage.ts`: contiene métodos reutilizables para el inicio de sesión y el registro de usuarios.
- Los archivos `.spec.ts`: contienen los casos de prueba automatizados.
- `playwright.config.ts`: contiene la configuración de Playwright.
- `package.json`: contiene las dependencias y los comandos del proyecto.
- `README.md`: documenta el proyecto y los escenarios probados.

## 5. Instalación y ejecución

### Instalar las dependencias

Desde la terminal de Visual Studio Code, ubicada en la carpeta del proyecto, ejecutar:

```bash
npm install
```

Si Playwright no está instalado en el proyecto, instalarlo con:

```bash
npm install -D @playwright/test
```

### Ejecutar todos los casos de prueba

```bash
npx playwright test
```

### Ejecutar las pruebas mostrando el navegador

```bash
npx playwright test --headed
```

### Ejecutar un archivo específico

Ejemplo para el caso 16:

```bash
npx playwright test tests/functional.spec.ts --headed
```

Para los demás archivos, utilizar su nombre y ruta exactos.

### Consultar el reporte de resultados

```bash
npx playwright show-report
```

## 6. Consideraciones

- Las pruebas de compra utilizan datos de prueba y se ejecutan en un sitio destinado a practicar automatización.
- El usuario utilizado para iniciar sesión debe existir antes de ejecutar el caso correspondiente.
- Algunos casos eliminan la cuenta al finalizar, por lo que podría ser necesario crearla nuevamente antes de repetirlos.
- El caso del CVV debe evaluarse según la respuesta real de la página.
- Los resultados finales deben registrarse como satisfactorios o fallidos de acuerdo con los resultados observados durante la ejecución.

## 7. Conclusión

El proyecto permite practicar la automatización de flujos funcionales con Playwright y TypeScript, reutilizar métodos mediante una clase de página, administrar datos de prueba y verificar los resultados de diferentes escenarios de compra.
