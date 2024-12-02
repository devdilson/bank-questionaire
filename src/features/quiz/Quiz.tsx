import { useContext, useEffect, useState } from 'react';
import { Question } from '../../model/model';
import { QuizServiceContext } from '../../services/quiz';
import ErrorMessage from '../../components/Errors';

const Quiz = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<number[]>([]);
    const [showSummary, setShowSummary] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const quizService = useContext(QuizServiceContext);

    useEffect(() => {
        quizService.getQuestions().then((data) => {
            setQuestions(data);
            setAnswers([...Array(data.length)].map(() => -1));
        });
    }, []);

    const handleAnswer = (optionIndex: number) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = optionIndex;
        setAnswers(newAnswers);
    };

    const calculateScore = () => {
        return questions.reduce((score, question, index) =>
            question.correct === answers[index] ? score + 1 : score, 0);
    };

    if (questions.length === 0) {
        return <ErrorMessage message="Questions not published yet, come back later." type='info' />;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            {!showSummary ? (
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="mb-6">
                        <p className="text-sm text-gray-600">
                            Question {currentQuestion + 1} of {questions.length}
                        </p>
                        <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                            <div
                                className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-6">
                            {questions[currentQuestion].question}
                        </h2>
                        <div className="space-y-3">
                            {questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                    className={`w-full p-4 text-left rounded-lg transition-colors
                                        ${answers[currentQuestion] === index
                                            ? 'bg-blue-100 border-2 border-blue-500'
                                            : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'}`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {answers[currentQuestion] !== -1 && (
                        <button
                            onClick={() => {
                                if (currentQuestion < questions.length - 1) {
                                    setCurrentQuestion(prev => prev + 1);
                                } else {
                                    setShowSummary(true);
                                }
                            }}
                            className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                        >
                            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Show Results'}
                        </button>
                    )}
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-6">Quiz Results</h2>
                    <div className="text-center mb-8">
                        <p className="text-4xl font-bold text-blue-500 mb-2">
                            {calculateScore()} / {questions.length}
                        </p>
                        <p className="text-gray-600">
                            {Math.round((calculateScore() / questions.length) * 100)}% correct
                        </p>
                    </div>

                    <div className="space-y-6">
                        {questions.map((question, index) => (
                            <div key={index} className="p-4 rounded-lg bg-gray-50">
                                <p className="font-medium mb-2">
                                    {index + 1}. {question.question}
                                </p>
                                <div className={`p-3 rounded ${answers[index] === question.correct
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    <p>Your answer: {question.options[answers[index]]}</p>
                                    {answers[index] !== question.correct && (
                                        <p className="mt-2 text-green-800">
                                            Correct answer: {question.options[question.correct]}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            setShowSummary(false);
                            setCurrentQuestion(0);
                        }}
                        className="w-full mt-8 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                    >
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default Quiz;