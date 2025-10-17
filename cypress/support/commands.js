// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- Login Command --
// Comando personalizado para hacer login de forma reutilizable
Cypress.Commands.add('login', (username, password) => {
  cy.get('[data-cy="username-input"]').type(username)
  cy.get('[data-cy="password-input"]').type(password)
  cy.get('[data-cy="login-button"]').click()
})

// -- Visit Login Page --
// Comando para visitar la página de login
Cypress.Commands.add('visitLogin', () => {
  cy.visit('/login.html')
})
