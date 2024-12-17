//need to mock - creates the hardcoded data
// need to intercept the api call - when the api call is attempted, the mock will replace the data
describe('API Requests', () => {
//TODO: add the describe portion of this page
)}

const mockAnswers = [
    {
        _id: '1',
        answerText: 'This is a test answer',
        //TODO: add addiional mock data 
    },
];

it('should GET all answers on the page', () => {
    cy.intercept('GET', '/api/answers', mockAnswers);
    cy.visit('/');
    cy.wait('@getAnswers')
        .its('response.body')
        .should('deep.equal', mockAnswers);
});
});