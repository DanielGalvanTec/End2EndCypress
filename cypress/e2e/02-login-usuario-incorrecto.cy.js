/**
 * TEST CASE 2: Login Fallido - Usuario Incorrecto
 *
 * Objetivo: Verificar que el sistema muestra un mensaje de error apropiado
 * cuando se intenta iniciar sesión con un usuario que no existe.
 *
 * Resultado esperado: Mensaje "Usuario incorrecto"
 */

describe('Test Case 2: Login Fallido - Usuario Incorrecto', () => {

  beforeEach(() => {
    // Visitar la página de login antes de la prueba
    cy.visitLogin()
  })

  it('Debe mostrar error cuando el usuario es incorrecto', () => {
    // ============= ARRANGE =============
    // Preparar credenciales con usuario inválido
    const invalidUsername = 'usuarioInvalido'
    const validPassword = 'password123'

    // ============= ACT =============
    // Intentar login con usuario incorrecto
    cy.get('[data-cy="username-input"]').type(invalidUsername)
    cy.get('[data-cy="password-input"]').type(validPassword)
    cy.get('[data-cy="login-button"]').click()

    // ============= ASSERT =============
    // Verificar que aparece el mensaje de error correcto
    cy.get('[data-cy="error-message"]')
      .should('be.visible')
      .and('contain', 'Usuario incorrecto')

    // Verificar que NO se redirige al dashboard
    cy.url().should('include', '/login.html')
    cy.url().should('not.include', '/dashboard.html')

    // Verificar que el mensaje de éxito NO aparece
    cy.get('[data-cy="success-message"]').should('not.be.visible')
  })
})
