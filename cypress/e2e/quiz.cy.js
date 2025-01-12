// End-to-end tests for the Tech Quiz
//these tests are more difficult 
//cy.visit 
// look at testing pyramid. Start with unit tests, then integration tests, then E2E tests. E2E takes a lot of time to run 
describe('Quiz', () => {
    it('Iterates through the quiz questions', () => {
        cy.visit('/quiz');

        cy.get('.btn').contains('Start Quiz').click();
        
        cy.get('h2').should('have.text', 'What is the best part of coding?');
        cy.get('.alert-secondary').contains('Testing the application, of course!').click();
        cy.get('.btn').contains('Next').click();

        cy.get('h2').should('have.text', 'What error code is used when an app is in a bad state?');
        cy.get('alert-secondary').contains('404').click();
        cy.get('.btn').contains('Next').click();

        cy.get('h2').should('have.text', 'Quiz Completed');
        cy.get('.alert').should('contain.text', 'Your score: 2/2');
        cy.get('.btn').contains('Take New Quiz').should('exist');
    });
});