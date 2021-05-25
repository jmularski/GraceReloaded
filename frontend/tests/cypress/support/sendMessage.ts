const sendMessage = (text) => {
    cy.get("#messageInput").type(text);
    cy.get("#sendMessage").click()
}

Cypress.Commands.add("sendMessage", (text) => {
    sendMessage(text);
});