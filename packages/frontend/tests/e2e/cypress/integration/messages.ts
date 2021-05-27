/// <reference types="cypress" />

interface MessagesFixture {
    message: string;
    response: string;
}


describe('Homepage', () => {
  it('loads successfully', () => {
    cy.visit('/');
  });
});

describe('Sending a message', () => {
  let data: MessagesFixture;

  before(() => {
    cy.visit('/');
    cy.fixture('messages.json').then((response: object) => {
      data = response as MessagesFixture;
    });
  });

  it('shows up', () => {
    cy.sendMessage(data.message);
    cy.get('.message').last().should('contain', data.message);
  });

  //it('receives a reply', () => {
  //  cy.wait(20000);
  //  cy.get('.message').last().should('contain', data.response);
  //});
});

describe('Searching a message', () => {
  let data: MessagesFixture;

  before(() => {
    cy.visit('/');
    cy.fixture('messages.json').then((response: object) => {
      data = response as MessagesFixture;
      cy.sendMessage(data.message);
    });
  });

  it('can search a message', () => {
    cy.get('#search').click().type(data.message);
    cy.get('.message').last().should('contain', data.message);
  });
});
