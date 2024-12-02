import React from "react";
import { Quiz, QuizSubmission } from "../model/model";


export interface QuizService {
    getCurrentQuiz(): Promise<Quiz>;
    createQuiz(quiz: Quiz): void;
    submitQuiz(submission: QuizSubmission): void;
}

export class QuizServiceImpl implements QuizService {

    private _currentQuiz: Quiz | null = null;
    private _submissions = new Map<string, QuizSubmission>();

    getCurrentQuiz(): Promise<Quiz> {
        if (!this._currentQuiz) {
            return Promise.reject("No quiz available");
        }
        return Promise.resolve(this._currentQuiz);
    }

    createQuiz(quiz: Quiz) {
        this._currentQuiz = quiz
    }

    submitQuiz(submission: QuizSubmission) {
        this._submissions.set(submission.username, submission);
    }
}


const quizService = new QuizServiceImpl();
const QuizServiceContext = React.createContext<QuizService>(quizService);

const getQuizContext = () => quizService;

export { QuizServiceContext, getQuizContext };