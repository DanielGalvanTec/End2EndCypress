/**
 * TEST CASE 1: Login Exitoso con Credenciales Válidas
 *
 * Objetivo: Verificar que un usuario puede iniciar sesión exitosamente
 * con credenciales correctas y es redirigido al dashboard.
 *
 * Credenciales válidas:
 * - Usuario: admin
 * - Contraseña: password123
 */

describe('Test Case 1: Login Exitoso', () => {

  beforeEach(() => {
    // Visitar la página de login antes de la prueba
    cy.visitLogin()
  })

  it('Debe permitir login exitoso con credenciales correctas y redirigir al dashboard', () => {
    // ============= ARRANGE =============
    // Preparar las credenciales válidas
    const username = 'admin'
    const password = 'password123'

    // ============= ACT =============
    // Realizar el proceso de login
    cy.get('[data-cy="username-input"]').type(username)
    cy.get('[data-cy="password-input"]').type(password)
    cy.get('[data-cy="login-button"]').click()

    // ============= ASSERT =============
    // Verificar mensaje de éxito
    cy.get('[data-cy="success-message"]')
      .should('be.visible')
      .and('contain', '¡Inicio de sesión exitoso!')

    // Verificar redirección al dashboard
    cy.url({ timeout: 3000 }).should('include', '/dashboard.html')

    // Verificar elementos del dashboard
    cy.get('[data-cy="dashboard-title"]')
      .should('be.visible')
      .and('contain', 'Dashboard')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('contain', 'Has iniciado sesión correctamente')
  })
})
