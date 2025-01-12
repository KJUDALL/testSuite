// Component tests for the Quiz component
import React from 'react';
import Quiz from '../../client/src/components/Quiz';
import { describe } from 'node:test';

const questions = [
	{
		_id: '1',
		question: 'What is the best part of coding?',
		answer: 'Testing the application, of course!',
		createdAt: '2025-01-11T13:00:00Z',
		possibleAnswers: [
			{
				_id: '1',
				createdAt: '2025-01-12T01:00:00Z',
				text: 'Doing the CSS',
			},
			{
				_id: '2',
				createdAt: '2025-01-13T01:00:00Z',
				text: 'Using AI for assistance',
			},
		],
	},
	{
		_id: '2',
		question: 'What error code is used when an app is in a bad state?',
		answer: '404',
		createdAt: '2025-01-11T16:00:00Z',
		possibleAnswers: [
			{
				_id: '3',
				createdAt: '2025-01-20T11:00:00Z',
				text: '500',
			},
			{
				_id: '4',
				createdAt: '2025-01-25T03:00:00Z',
				text: '200',
			},
		],
	},
];

describe('<Quiz/>', () => {
	it('should render the Quiz component', () => {
		cy.mount(
			<Quiz
				questions={questions}
				title='Tech quiz test questions...'
			/>
		);
	});

	//test header for quiz name
	//test button for 'Start quiz'
	//test for if questions === 0
	// else test if answers to first question display
	//test first question's answers being clickable or not
	//test if second question displays
	//test if second questions answers display
	//test if second question's answers are clickable
	//test 'Test Complete' header
	//test if final score is displayed
	//test button for 'Take New Quiz'
	it('should render the Quiz with the proper content', () => {
		cy.mount(
			<Quiz
				questions={questions}
				title='Tech quiz test questions...'
			/>
		);
		cy.get('h2').should('have.text', 'Tech quiz test questions...');
		cy.get('.btn').contains('Start Quiz').click();
		cy.get('h2').should('have.text', questions[0].question);
		cy.get('.alert-secondary')
			.contains(questions[0].possibleAnswers[0].text)
			.should('exist');
		cy.get('.alert-secondary')
			.contains(questions[1].possibleAnswers[1].text)
			.should('exist');
		cy.get('.btn').contains('1').should('exist');
		cy.get('.btn').contains('2').should('exist');
		cy.get('.btn').contains('1').click();
		cy.get('h2').should('have.text', questions[1].question);
		cy.get('.alert-secondary').contains(questions[1].possibleAnswers[0]);
		cy.get('.alert-secondary').contains(questions[1].possibleAnswers[1]);
		cy.get('.btn').contains('1').should('exist');
		cy.get('.btn').contains('2').should('exist');
		cy.get('.btn').contains('1').click();
		cy.get('h2').should('have.text', 'Quiz Completed');
        cy.get('.alert').should('contain.text', `Your score: 2/${questions.length}`)
		);
		cy.get('.btn').contains('Take New Quiz').should('exist');
	});
}); 
