import type { Question } from "../../../client/src/models/Question";
import type { Answer } from "../../../client/src/models/Answer";

describe("API Requests", () => {
	const mockQuestions: Question[] = [
		{
			_id: "1",
			question: "What is the best part of coding?",
			answers: [
				{ text: "Testing the application, of course!", isCorrect: true },
				{ text: "Doing the CSS.", isCorrect: false },
				{ text: "Using AI for assistance.", isCorrect: false },
			],
		},
		{
			_id: "2",
			question: "What error code is used when an app is in a bad state?",
			answers: [
				{ text: "500", isCorrect: false },
				{ text: "404", isCorrect: true },
				{ text: "200", isCorrect: false },
			],
		},
	];

	it("should GET all answers and render them on the page", () => {
		cy.intercept("GET", "/api/questions/random", {
			statusCode: 200,
			body: mockQuestions,
		}).as("getQuestions");

		cy.visit("/");
		cy.get(".btn").contains("Start Quiz").click();
		cy.wait("@getQuestions")
			.its("response.body")
			.should("deep.equal", mockQuestions);

		cy.get("h2").should("have.text", mockQuestions[0].question);
		mockQuestions[0].answers.forEach((answer: Answer) => {
			cy.contains(answer.text).should("exist");
		});
	});

	it("should proceed to next question when an answer is clicked", () => {
		cy.intercept("GET", "/api/questions/random", {
			statusCode: 200,
			body: mockQuestions,
		}).as("getQuestions");

		cy.visit("/");
		cy.get(".btn").contains("Start Quiz").click();
		cy.wait("@getQuestions");
		cy.contains(mockQuestions[0].answers[0].text).click();
		cy.get("h2").should("have.text", mockQuestions[1].question);
	});

	it("should show the score and allow user to restart quiz after completion", () => {
		cy.intercept("GET", "/api/questions/random", {
			statusCode: 200,
			body: mockQuestions,
		}).as("getQuestions");

		cy.visit("/");
		cy.get(".btn").contains("Start Quiz").click();
		cy.wait("@getQuestions");

		mockQuestions.forEach((question, index) => {
			cy.contains(
				question.answers.find((a: Answer) => a.isCorrect)?.text || ""
			).click();
			if (index < mockQuestions.length - 1) {
				cy.get("h2").should("have.text", mockQuestions[index + 1].question);
			}
		});

		cy.get("h2").should("have.text", "Quiz Completed");
		cy.get(".alert-success").should(
			"contain.text",
			`Your score: ${
				mockQuestions.filter((q) => q.answers.some((a: Answer) => a.isCorrect))
					.length
			}/${mockQuestions.length}`
		);

		cy.get(".btn").contains("Take New Quiz").click();
		cy.get("h2").should("have.text", mockQuestions[0].question);
	});
});
