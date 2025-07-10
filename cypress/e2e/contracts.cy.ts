/// <reference types="cypress" />

describe("Contract Management UI", () => {
  const timestamp = Date.now();
  const contract = {
    name: `Test Contract S${timestamp}`,
    startDate: "2025-07-10",
    endDate: "2025-12-31"
  };

  beforeEach(() => {
    cy.loginViaUI();
    cy.get('[data-cy="nav-contracts"]').click();
  cy.url().should("include", "/contracts");
    // cy.visit("http://localhost:3000/contracts");
  });

  it("Loads the contract form and fields", () => {
    cy.get('[data-cy="contract-name-input"]').should("exist");
    cy.get('[data-cy="contract-start-input"]').should("exist");
    cy.get('[data-cy="contract-end-input"]').should("exist");
    cy.get('[data-cy="submit-btn"]').should("exist");
  });

  it("Creates a new contract", () => {
    cy.get('[data-cy="contract-name-input"]').type(contract.name);
    cy.get('[data-cy="contract-start-input"]').type(contract.startDate);
    cy.get('[data-cy="contract-end-input"]').type(contract.endDate);
    cy.get('[data-cy="submit-btn"]').click();

    cy.contains(contract.name).should("exist");
    cy.contains(`Start: ${contract.startDate}`).should("exist");
    cy.contains(`End: ${contract.endDate}`).should("exist");
  });

    it("Shows the created contract in invoice page", () => {
    cy.get('[data-cy="nav-invoice"]').click();
    cy.url().should("include", "/invoice");
    cy.contains(contract.name).should("exist");
  });

  it("Edits an existing contract", () => {
    cy.contains(contract.name).parent().within(() => {
      cy.contains("Update").click();
    });

    cy.get('[data-cy="contract-end-input"]').clear().type("2026-01-01");
    cy.get('[data-cy="submit-btn"]').click();

    cy.contains("End: 2026-01-01").should("exist");
  });

  it("Cancels editing a contract", () => {
    cy.contains(contract.name).parent().within(() => {
      cy.contains("Update").click();
    });

    cy.get('[data-cy="cancel-btn"]').click();
    cy.get('[data-cy="contract-name-input"]').should("not.be.disabled");
  });

  it("Deletes a contract", () => {
    cy.contains(contract.name).parent().within(() => {
      cy.contains("Delete").click();
    });

    cy.contains(contract.name).should("not.exist");
  });

  it("Does not show the deleted contract in invoice page", () => {
    cy.get('[data-cy="nav-invoice"]').click();
    cy.url().should("include", "/invoice");
    cy.contains(contract.name).should("not.exist");
  });

  
});
