import React from "react";
import { Question } from "../model";




export class QuizService {
    private quizzes: Question[] = [];


    async createQuiz(quiz: Question): Promise<Question> {
        this.quizzes.push(quiz);
        return quiz;
    }

    async getQuizzes(): Promise<Question[]> {
        return this.quizzes;
    }
}


const quizService = new QuizService();
const QuizServiceContext = React.createContext<QuizService>(quizService);

const getQuizContext = () => quizService;

export { QuizServiceContext, getQuizContext };