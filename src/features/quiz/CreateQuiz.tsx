import React, { useContext, useState } from 'react';
import { QuizServiceContext } from '../../services/quiz';



const QuizForm = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState<string[]>(['', '', '', '']);
    const [correct, setCorrect] = useState<number>(0);


    const quizService = useContext(QuizServiceContext);

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        quizService.createQuiz({ question, options, correct });
        resetForm();
    };

    const resetForm = () => {
        setQuestion('');
        setOptions(['', '', '', '']);
        setCorrect(0);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg p-6 bg-white rounded-lg shadow">
            <div>Create the quiz of this week</div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question
                </label>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="space-y-4">
                {options.map((option, index) => (
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
                            checked={correct === index}
                            onChange={() => setCorrect(index)}
                            className="mt-3"
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                >
                    Reset
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

export default QuizForm;