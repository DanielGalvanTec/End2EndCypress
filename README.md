# Pruebas E2E con Cypress - Login Page

**Actividad de Aprendizaje:** Pruebas End-to-End con Cypress - Login Page

## Inicio Rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar el servidor (Terminal 1)
```bash
npm start
```
Abre: `http://127.0.0.1:8080/login.html`

### 3. Ejecutar pruebas (Terminal 2)

**Modo interactivo:**
```bash
npm run cypress:open
```

**Modo headless (con video):**
```bash
npm test
```

---

## Credenciales de Prueba

- **Usuario válido:** `admin`
- **Contraseña válida:** `password123`

---

## Diagrama de Flujo de Pruebas

```
                    ┌─────────────────────────┐
                    │   Iniciar Pruebas E2E   │
                    └───────────┬─────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │  cy.visit('/login.html')│
                    └───────────┬─────────────┘
                                │
                ┌───────────────┴───────────────┐
                │                               │
                ▼                               ▼
    ┌───────────────────────┐       ┌───────────────────────┐
    │ CASOS VÁLIDOS         │       │ CASOS INVÁLIDOS       │
    │ Test 1:               │       │ Test 2: Usuario       │
    │ Credenciales correctas│       │         incorrecto    │
    └───────────┬───────────┘       │ Test 3: Password      │
                │                   │         incorrecta    │
                │                   │ Test 4: Campos vacíos │
                │                   │ Test 5: Longitud      │
                │                   │         inválida      │
                │                   └───────────┬───────────┘
                │                               │
                ▼                               ▼
    ┌───────────────────────┐       ┌───────────────────────┐
    │ cy.get().type()       │       │ cy.get().type()       │
    │ cy.click()            │       │ cy.click()            │
    └───────────┬───────────┘       └───────────┬───────────┘
                │                               │
                ▼                               ▼
    ┌───────────────────────┐       ┌───────────────────────┐
    │ .should('be.visible') │       │ .should('be.visible') │
    │ .and('contain', '✓')  │       │ .and('contain', '✗')  │
    └───────────┬───────────┘       └───────────┬───────────┘
                │                               │
                ▼                               ▼
    ┌───────────────────────┐       ┌───────────────────────┐
    │ Redirección:          │       │ Permanece en:         │
    │ /dashboard.html       │       │ /login.html           │
    └───────────┬───────────┘       └───────────┬───────────┘
                │                               │
                ▼                               ▼
    ┌───────────────────────┐       ┌───────────────────────┐
    │ ✓ Test Pasó           │       │ ✓ Test Pasó           │
    └───────────────────────┘       └───────────────────────┘
```

---

## Test Cases Implementados

### Test 1: Login Exitoso 
**Archivo:** `01-login-exitoso.cy.js`

```js
it('Debe permitir login exitoso con credenciales correctas', () => {

  const username = 'admin'
  const password = 'password123'


  cy.get('[data-cy="username-input"]').type(username)
  cy.get('[data-cy="password-input"]').type(password)
  cy.get('[data-cy="login-button"]').click()


  cy.get('[data-cy="success-message"]')
    .should('be.visible')
    .and('contain', '¡Inicio de sesión exitoso!')

  cy.url({ timeout: 3000 }).should('include', '/dashboard.html')
})
```

**Resultado esperado:** Login exitoso → Mensaje de éxito → Redirección a dashboard

---

### Test 2: Usuario Incorrecto 
**Archivo:** `02-login-usuario-incorrecto.cy.js`

```javascript
it('Debe mostrar error cuando el usuario es incorrecto', () => {
  cy.get('[data-cy="username-input"]').type('usuarioInvalido')
  cy.get('[data-cy="password-input"]').type('password123')
  cy.get('[data-cy="login-button"]').click()

  cy.get('[data-cy="error-message"]')
    .should('be.visible')
    .and('contain', 'Usuario incorrecto')

  cy.url().should('include', '/login.html')
})
```

**Resultado esperado:** Mensaje "Usuario incorrecto" → Permanece en login

---

### Test 3: Contraseña Incorrecta 
**Archivo:** `03-login-password-incorrecta.cy.js`

```javascript
it('Debe mostrar error cuando la contraseña es incorrecta', () => {
  cy.get('[data-cy="username-input"]').type('admin')
  cy.get('[data-cy="password-input"]').type('wrongpassword')
  cy.get('[data-cy="login-button"]').click()

  cy.get('[data-cy="error-message"]')
    .should('be.visible')
    .and('contain', 'Contraseña incorrecta')
})
```

**Resultado esperado:** Mensaje "Contraseña incorrecta" → Permanece en login

---

### Test 4: Campos Vacíos 
**Archivo:** `04-campos-vacios.cy.js` 

```js
// Ambos campos vacíos
it('Debe mostrar error cuando ambos campos están vacíos', () => {
  cy.get('[data-cy="login-button"]').click()

  cy.get('[data-cy="error-message"]')
    .should('be.visible')
    .and('contain', 'complete todos los campos')
})

// Solo usuario lleno
// Solo contraseña llena
```

**Resultado esperado:** Mensaje "complete todos los campos"

---

### Test 5: Validación de Longitud 
**Archivo:** `05-validacion-longitud.cy.js` 

```js

it('Debe mostrar error cuando el usuario tiene menos de 3 caracteres', () => {
  cy.get('[data-cy="username-input"]').type('ab')
  cy.get('[data-cy="password-input"]').type('password123')
  cy.get('[data-cy="login-button"]').click()

  cy.get('[data-cy="error-message"]')
    .should('be.visible')
    .and('contain', 'debe tener al menos 3 caracteres')
})


```

## Comando Personalizado

**Archivo:** `cypress/support/commands.js`

```javascript
// Comando reutilizable para login
Cypress.Commands.add('login', (username, password) => {
  cy.get('[data-cy="username-input"]').type(username)
  cy.get('[data-cy="password-input"]').type(password)
  cy.get('[data-cy="login-button"]').click()
})

// Comando para visitar login
Cypress.Commands.add('visitLogin', () => {
  cy.visit('/login.html')
})
```

**Uso:**
```js
cy.visitLogin()
cy.login('admin', 'password123')
```

---

## Resultados Esperados

```
  Test Case 1: Login Exitoso
  Debe permitir login exitoso 

  Test Case 2: Login Fallido - Usuario Incorrecto
  Debe mostrar error cuando el usuario es incorrecto 

  Test Case 3: Login Fallido - Contraseña Incorrecta
  Debe mostrar error cuando la contraseña es incorrecta 

  Test Case 4: Validación de Campos Vacíos
  Debe mostrar error cuando ambos campos están vacíos 
  Debe mostrar error cuando solo se llena el usuario 
  Debe mostrar error cuando solo se llena la contraseña (

  Test Case 5: Validación de Longitud Mínima
  Debe mostrar error cuando el usuario tiene menos de 3 caracteres 
  Debe mostrar error cuando la contraseña tiene menos de 6 caracteres 

  8 passing (3s)
```

## Tecnologías

- Cypress v15.4.0
- http-server v14.1.1
- Node.js v14+
