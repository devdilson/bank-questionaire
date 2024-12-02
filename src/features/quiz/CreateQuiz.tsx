import React, { useContext, useState } from 'react';
import { QuizServiceContext } from '../../services/quiz';
import { Question } from '../../model/model';
import ErrorMessage from '../../components/Errors';
import { Link } from 'react-router-dom';
import { BankServiceContext } from '../../services';

const QuizForm = () => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizSubmited, setQuizSubmited] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [currentOptions, setCurrentOptions] = useState<string[]>(['', '', '', '']);
    const [currentCorrect, setCurrentCorrect] = useState<number>(0);

    const quizService = useContext(QuizServiceContext);
    const bankService = useContext(BankServiceContext);

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...currentOptions];
        newOptions[index] = value;
        setCurrentOptions(newOptions);
    };

    const handleStartQuiz = (e: React.FormEvent) => {
        e.preventDefault();
        setQuizStarted(true);
    };

    const handleAddQuestion = (e: React.FormEvent) => {
        e.preventDefault();
        const newQuestion = {
            question: currentQuestion,
            options: currentOptions,
            correct: currentCorrect
        };
        setQuestions([...questions, newQuestion]);
        resetQuestionForm();
    };

    const handleSubmitQuiz = async () => {
        quizService.createQuiz({
            start: startDate,
            end: endDate,
            questions
        });
        setQuizSubmited(true);
        resetForm();
    };

    const resetQuestionForm = () => {
        setCurrentQuestion('');
        setCurrentOptions(['', '', '', '']);
        setCurrentCorrect(0);
    };

    const resetForm = () => {
        resetQuestionForm();
        setStartDate('');
        setEndDate('');
        setQuestions([]);
    };


    if (quizSubmited) {
        return <div>
            <ErrorMessage message="Quiz submitted successfully" type='success'>
                <Link to="/login" className="text-blue-600" onClick={() => bankService.logout()}>Go back to Login</Link>
            </ErrorMessage>

        </div>
    }


    if (!quizStarted) {
        return (
            <form onSubmit={handleStartQuiz} className="space-y-6 w-full max-w-lg p-6 bg-white rounded-lg shadow">
                <div className="text-xl font-semibold mb-4">Create New Quiz</div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Start Date
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            End Date
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    Start Adding Questions
                </button>
            </form>
        );
    }

    return (
        <div className="space-y-6 w-full max-w-lg p-6 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center">
                <div className="text-xl font-semibold">Add Questions</div>
                <div className="text-sm text-gray-600">
                    Questions added: {questions.length}
                </div>
            </div>

            <form onSubmit={handleAddQuestion} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question
                    </label>
                    <input
                        type="text"
                        value={currentQuestion}
                        onChange={(e) => setCurrentQuestion(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="space-y-4">
                    {currentOptions.map((option, index) => (
                        <div key={index} className="flex gap-4">
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                placeholder={`Option ${index + 1}`}
                                className="flex-1 p-2 border rounded"
                                required
                            />
                            <input
                                type="radio"
                                name="correct"
                                checked={currentCorrect === index}
                                onChange={() => setCurrentCorrect(index)}
                                className="mt-3"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                    >
                        Add Question
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmitQuiz}
                        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                        disabled={questions.length === 0}
                    >
                        Submit Quiz
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QuizForm;