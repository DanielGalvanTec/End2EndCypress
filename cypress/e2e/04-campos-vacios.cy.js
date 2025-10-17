/**
 * TEST CASE 4: Validación de Campos Vacíos
 *
 * Objetivo: Verificar que el sistema valida correctamente cuando
 * los campos de entrada están vacíos o sin completar.
 *
 * Resultado esperado: Mensaje "complete todos los campos"
 */

describe('Test Case 4: Validación de Campos Vacíos', () => {

  beforeEach(() => {
    // Visitar la página de login antes de la prueba
    cy.visitLogin()
  })

  it('Debe mostrar error cuando ambos campos están vacíos', () => {
    // ============= ARRANGE =============
    // No se ingresan datos (campos vacíos)

    // ============= ACT =============
    // Intentar hacer click en el botón sin llenar campos
    cy.get('[data-cy="login-button"]').click()

    // ============= ASSERT =============
    // Verificar que aparece el mensaje de validación
    cy.get('[data-cy="error-message"]')
      .should('be.visible')
      .and('contain', 'complete todos los campos')

    // Verificar que permanece en la página de login
    cy.url().should('include', '/login.html')
  })

  it('Debe mostrar error cuando solo se llena el usuario', () => {
    // ============= ARRANGE =============
    const username = 'admin'
    // Password queda vacío

    // ============= ACT =============
    cy.get('[data-cy="username-input"]').type(username)
    cy.get('[data-cy="login-button"]').click()

    // ============= ASSERT =============
    cy.get('[data-cy="error-message"]')
      .should('be.visible')
      .and('contain', 'complete todos los campos')
  })

  it('Debe mostrar error cuando solo se llena la contraseña', () => {
    // ============= ARRANGE =============
    const password = 'password123'
    // Username queda vacío

    // ============= ACT =============
    cy.get('[data-cy="password-input"]').type(password)
    cy.get('[data-cy="login-button"]').click()

    // ============= ASSERT =============
    cy.get('[data-cy="error-message"]')
      .should('be.visible')
      .and('contain', 'complete todos los campos')
  })
})
