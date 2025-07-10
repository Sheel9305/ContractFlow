/// <reference types="cypress" />

describe("Login and Logout Flow", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("http://localhost:3000");
    cy.get('[data-cy="login-link"]', { timeout: 8000 }).should('be.visible').click();
  });

  it("logs in with valid credentials", () => {
    cy.get('[data-cy="username"]').type("admin");
    cy.get('[data-cy="password"]').type("pass@123");
    cy.get('[data-cy="login-btn"]').click();
    cy.get('[data-cy="logout-btn"]').should("exist");
  });

  it("does not log in with invalid credentials", () => {
    cy.get('[data-cy="username"]').type("admin");
    cy.get('[data-cy="password"]').type("wrongpass");
    cy.get('[data-cy="login-btn"]').click();
    cy.get('[data-cy="logout-btn"]').should("not.exist");
    cy.contains("Invalid username or password!").should("exist");
  });

  it("logs out successfully", () => {
    cy.get('[data-cy="username"]').type("admin");
    cy.get('[data-cy="password"]').type("pass@123");
    cy.get('[data-cy="login-btn"]').click();
    cy.get('[data-cy="logout-btn"]').click();
    cy.get('[data-cy="login-link"]').should("exist");
  });
});
