// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//assert user creation
Cypress.Commands.add('confirmSignUp', () => {
    cy.get('.modal').should('contain', 'Sign up successful');
    cy.get('.modal .btn-primary').click();
})

//pentru log in si sign up - sterge in caz ca nu merge
Cypress.Commands.add("typeWithRetry", (selector, text, retries = 3) => {
    let attempts = 0;
    const typeInField = () => {
        cy.get(selector, { timeout: 10000 }).should('be.visible').clear().type(text, { delay: 10 });
        cy.get(selector).invoke('val').then(val => {
            if (val !== text && attempts < retries) {
                attempts++;
                typeInField(); // Retry typing
            }
        });
    };
    typeInField();
});