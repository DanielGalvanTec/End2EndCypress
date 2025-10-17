/**
 * TEST CASE 5: Validación de Longitud Mínima
 *
 * Objetivo: Verificar que el sistema valida la longitud mínima
 * requerida para usuario (3 caracteres) y contraseña (6 caracteres).
 *
 * Requisitos:
 * - Usuario: mínimo 3 caracteres
 * - Contraseña: mínimo 6 caracteres
 */

describe('Test Case 5: Validación de Longitud Mínima', () => {

  beforeEach(() => {
    // Visitar la página de login antes de la prueba
    cy.visitLogin()
  })

  it('Debe mostrar error cuando el usuario tiene menos de 3 caracteres', () => {
    // ============= ARRANGE =============
    // Usuario con solo 2 caracteres (inválido)
    const shortUsername = 'ab'
    const validPassword = 'password123'

    // ============= ACT =============
    cy.get('[data-cy="username-input"]').type(shortUsername)
    cy.get('[data-cy="password-input"]').type(validPassword)
    cy.get('[data-cy="login-button"]').click()

    // ============= ASSERT =============
    // Verificar mensaje de error por longitud
    cy.get('[data-cy="error-message"]')
      .should('be.visible')
      .and('contain', 'debe tener al menos 3 caracteres')

    // Verificar que permanece en login
    cy.url().should('include', '/login.html')
  })

  it('Debe mostrar error cuando la contraseña tiene menos de 6 caracteres', () => {
    // ============= ARRANGE =============
    // Contraseña con solo 5 caracteres (inválida)
    const validUsername = 'admin'
    const shortPassword = '12345'

    // ============= ACT =============
    cy.get('[data-cy="username-input"]').type(validUsername)
    cy.get('[data-cy="password-input"]').type(shortPassword)
    cy.get('[data-cy="login-button"]').click()

    // ============= ASSERT =============
    // Verificar mensaje de error por longitud
    cy.get('[data-cy="error-message"]')
      .should('be.visible')
      .and('contain', 'debe tener al menos 6 caracteres')

    // Verificar que permanece en login
    cy.url().should('include', '/login.html')
  })
})
