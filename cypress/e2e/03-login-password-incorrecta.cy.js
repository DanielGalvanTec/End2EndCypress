/**
 * TEST CASE 3: Login Fallido - Contraseña Incorrecta
 *
 * Objetivo: Verificar que el sistema muestra un mensaje de error apropiado
 * cuando se intenta iniciar sesión con la contraseña incorrecta.
 *
 * Resultado esperado: Mensaje "Contraseña incorrecta"
 */

describe('Test Case 3: Login Fallido - Contraseña Incorrecta', () => {

  beforeEach(() => {
    // Visitar la página de login antes de la prueba
    cy.visitLogin()
  })

  it('Debe mostrar error cuando la contraseña es incorrecta', () => {
    // ============= ARRANGE =============
    // Preparar credenciales con contraseña inválida
    const validUsername = 'admin'
    const invalidPassword = 'wrongpassword'

    // ============= ACT =============
    // Intentar login con contraseña incorrecta
    cy.get('[data-cy="username-input"]').type(validUsername)
    cy.get('[data-cy="password-input"]').type(invalidPassword)
    cy.get('[data-cy="login-button"]').click()

    // ============= ASSERT =============
    // Verificar que aparece el mensaje de error correcto
    cy.get('[data-cy="error-message"]')
      .should('be.visible')
      .and('contain', 'Contraseña incorrecta')

    // Verificar que NO se redirige al dashboard
    cy.url().should('include', '/login.html')
    cy.url().should('not.include', '/dashboard.html')

    // Verificar que el mensaje de éxito NO aparece
    cy.get('[data-cy="success-message"]').should('not.be.visible')
  })
})
