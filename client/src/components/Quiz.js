import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, } from 'react';
import { getQuestions } from '../services/questionApi.js';
const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const getRandomQuestions = async () => {
        try {
            const questions = await getQuestions();
            if (!questions) {
                throw new Error('something went wrong!');
            }
            setQuestions(questions);
        }
        catch (err) {
            console.error(err);
        }
    };
    const handleAnswerClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        }
        else {
            setQuizCompleted(true);
        }
    };
    const handleStartQuiz = async () => {
        await getRandomQuestions();
        setQuizStarted(true);
        setQuizCompleted(false);
        setScore(0);
        setCurrentQuestionIndex(0);
    };
    if (!quizStarted) {
        return (_jsx("div", { className: "p-4 text-center", children: _jsx("button", { className: "btn btn-primary d-inline-block mx-auto", onClick: handleStartQuiz, children: "Start Quiz" }) }));
    }
    if (quizCompleted) {
        return (_jsxs("div", { className: "card p-4 text-center", children: [_jsx("h2", { children: "Quiz Completed" }), _jsxs("div", { className: "alert alert-success", children: ["Your score: ", score, "/", questions.length] }), _jsx("button", { className: "btn btn-primary d-inline-block mx-auto", onClick: handleStartQuiz, children: "Take New Quiz" })] }));
    }
    if (questions.length === 0) {
        return (_jsx("div", { className: "d-flex justify-content-center align-items-center vh-100", children: _jsx("div", { className: "spinner-border text-primary", role: "status", children: _jsx("span", { className: "visually-hidden", children: "Loading..." }) }) }));
    }
    const currentQuestion = questions[currentQuestionIndex];
    return (_jsxs("div", { className: 'card p-4', children: [_jsx("h2", { children: currentQuestion.question }), _jsx("div", { className: "mt-3", children: currentQuestion.answers.map((answer, index) => (_jsxs("div", { className: "d-flex align-items-center mb-2", children: [_jsx("button", { className: "btn btn-primary", onClick: () => handleAnswerClick(answer.isCorrect), children: index + 1 }), _jsx("div", { className: "alert alert-secondary mb-0 ms-2 flex-grow-1", children: answer.text })] }, index))) })] }));
};
export { Quiz };
