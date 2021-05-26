/// <reference types="cypress" />
import './sendMessage';

declare namespace Cypress {
    interface Chainable {
      /**
       * Custom command to send a chat message with given text
       * @example cy.sendMessage('Test message')
       */
      sendMessage(text: string): void
    }
}