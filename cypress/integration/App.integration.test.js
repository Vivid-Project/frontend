import * as API from '../../src/API/APIcalls';

describe('Application integration testing', () => {
  it('should be able to login and see the dashboard', () => {
    cy.visit('http://localhost:3000/')
      .get('input:first')
      .type('mjones@example.com')
      .get('input:last')
      .type('password')
      .get('button')
      .contains('Login')
      .click();

    cy.url().should('include', '/dashboard');
  });

  it('should be able to go to the new dream section from the dashboard "+" icon', () => {
    cy.get('[data-testId="addButton"]').click();

    cy.url().should('include', '/newdream');
  });

  it('should be able to log out, and return to the login screen', () => {
    cy.get('span').contains('Logout').click();

    cy.url().should('include', '/');
  });

  it('should be able to navigate the site through the nav buttons', () => {
    cy.visit('http://localhost:3000/')
      .get('input:first')
      .type('mjones@example.com')
      .get('input:last')
      .type('password')
      .get('button')
      .contains('Login')
      .click();

    //Go to ADD
    cy.get('[data-testId="Add"]').click();
    cy.url().should('include', '/newdream');

    //Go to Journal
    cy.get('[data-testId="Journal"]').click();
    cy.url().should('include', '/dreamjournal');

    //Go to Dashboard
    cy.get('[data-testId="Dashboard"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('should route to dream journal after adding a new dream', () => {
    //Login
    cy.visit('http://localhost:3000/')
      .get('input:first')
      .type('mjones@example.com')
      .get('input:last')
      .type('password')
      .get('button')
      .contains('Login')
      .click();

    // Navigate to Add Dream and input info
    cy.get('[data-testId="Add"]')
      .click()
      .get('input:first')
      .type('A Dream')
      .get('[data-testId="describeInput"]')
      .type('This is the description');

    //Spin up fake server, mock response
    cy.server();
    cy.route('POST', '**/newdream', 'fixture:dreamResponseData.json');

    //Submit
    cy.get('[data-testId="submit-dream"]').click();

    //Assert
    cy.url().should('include', '/dreamjournal');
  });
});
