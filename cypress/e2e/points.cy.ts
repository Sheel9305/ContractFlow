/// <reference types="cypress" />

describe("Points Management UI", () => {
  const timestamp = Date.now();
  const contract = {
    name: `Test Contract ${timestamp}`,
    startDate: "2025-07-10",
    endDate: "2025-12-31"
  };
  const point = {
    name: `Test Point ${timestamp}`,
    value: "123"
  };

  before(() => {
    cy.loginViaUI();
    cy.get('[data-cy="nav-contracts"]').click();

    cy.get('[data-cy="contract-name-input"]').type(contract.name);
    cy.get('[data-cy="contract-start-input"]').type(contract.startDate);
    cy.get('[data-cy="contract-end-input"]').type(contract.endDate);
    cy.get('[data-cy="submit-btn"]').click();

    cy.contains(contract.name).should("exist");
  });

  beforeEach(() => {
  cy.visit("http://localhost:3000");
  cy.loginViaUI();
  cy.get('[data-cy="nav-points"]').should("exist").click();
  cy.url().should("include", "/points");
});

  it("Loads point form and contract dropdown", () => {
    cy.get('[data-cy="contract-selector"]').should("exist");
    cy.get('[data-cy="point-name-input"]').should("exist");
    cy.get('[data-cy="point-value-input"]').should("exist");
    cy.get('[data-cy="point-submit-btn"]').should("exist");
  });

  it("Creates a new point", () => {
    cy.get('[data-cy="contract-selector"]').select(contract.name);
    cy.get('[data-cy="point-name-input"]').type(point.name);
    cy.get('[data-cy="point-value-input"]').type(point.value);
    cy.get('[data-cy="point-submit-btn"]').click();

    cy.contains(point.name).should("exist");
    cy.contains(`Value: ${point.value}`).should("exist");
  });

  it("Edits an existing point", () => {
    cy.contains(point.name).parent().within(() => {
      cy.contains("Update").click();
    });

    cy.get('[data-cy="point-value-input"]').clear().type("456");
    cy.get('[data-cy="point-submit-btn"]').click();

    cy.contains("Value: 456").should("exist");
  });

  it("Cancels editing a point", () => {
    cy.contains(point.name).parent().within(() => {
      cy.contains("Update").click();
    });

    cy.get('[data-cy="point-cancel-btn"]').click();
    cy.get('[data-cy="point-name-input"]').should("be.enabled");
  });

  it("Deletes a point", () => {
    cy.contains(point.name).parent().within(() => {
      cy.contains("Delete").click();
    });

    cy.contains(point.name).should("not.exist");
  });
});