import React from "react";
import { Question, Quiz } from "../model/model";




export class QuizService {

    private currentQuiz: Quiz | null = null;

    async getQuestions(): Promise<Question[]> {
        return this.currentQuiz?.questions || [];
    }

    createQuiz(quiz: Quiz) {
        this.currentQuiz = quiz
    }
}


const quizService = new QuizService();
const QuizServiceContext = React.createContext<QuizService>(quizService);

const getQuizContext = () => quizService;

export { QuizServiceContext, getQuizContext };