import React, { useState, useEffect } from 'react';
import {
  updateMCQQuestion,
  createMCQQuestion,
  updateShortAnswerQuestion,
  createShortAnswerQuestion,
} from '../../../api';

const CreateExam = ({ question, onSubmit, isEditMode = false }) => {
    const [text, setText] = useState(question?.text || '');
    const [questionType, setQuestionType] = useState(question?.question_type || 'MCQ');
    const [options, setOptions] = useState(question?.options || [{ text: '', is_answer: false }]);
    const [shortAnswer, setShortAnswer] = useState(question?.short_answer || '');

    useEffect(() => {
        if (isEditMode && question) {
            // Initialize with question data if editing
            setText(question.text);
            setQuestionType(question.question_type);
            setOptions(question.options || [{ text: '', is_answer: false }]);
            setShortAnswer(question.short_answer || '');
        }
    }, [question, isEditMode]);

    const resetForm = () => {
        setText('');
        setQuestionType('MCQ');
        setOptions([{ text: '', is_answer: false }]);
        setShortAnswer('');
    };

    const handleAddOption = () => {
        setOptions([...options, { text: '', is_answer: false }]);
    };

    const handleOptionChange = (index, field, value) => {
        const updatedOptions = [...options];
        if (field === 'is_answer') {
            // Reset all options to false except the selected one
            updatedOptions.forEach((option, idx) => {
                option.is_answer = idx === index ? value : false;
            });

        }
        updatedOptions[index][field] = value;
        setOptions(updatedOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const questionData = {
            text,
            question_type: questionType,
            options: questionType === 'MCQ' ? options : undefined,
            short_answer: questionType === 'DESC' ? shortAnswer : undefined,
        };

        try {
            let response;
            if (questionType === 'MCQ') {
                response = isEditMode
                    ? await updateMCQQuestion(question.id, questionData)
                    : await createMCQQuestion(questionData);
            } else {
                response = isEditMode
                    ? await updateShortAnswerQuestion(question.id, questionData)
                    : await createShortAnswerQuestion(questionData);
            }

            onSubmit(response.data);
            resetForm(); // Reset the form after submission
        } catch (error) {
            console.error('Error submitting question:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Question Text</label>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Question Type</label>
                <select
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                >
                    <option value="MCQ">Multiple Choice</option>
                    <option value="DESC">Descriptive</option>
                </select>
            </div>

            {questionType === 'MCQ' && (
                <div>
                    <label>Options</label>
                    {options.map((option, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                value={option.text}
                                onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                                placeholder="Option text"
                                required
                            />
                            <label>
                                <input
                                    type="radio"
                                    name="is_answer"
                                    checked={option.is_answer}
                                    onChange={() => handleOptionChange(index, 'is_answer', true)}
                                />
                                Is Correct
                            </label>
                            <button type="button" onClick={() => handleRemoveOption(index)}>
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddOption}>
                        Add Option
                    </button>
                </div>
            )}

            {questionType === 'DESC' && (
                <div>
                    <label>Short Answer</label>
                    <input
                        type="text"
                        value={shortAnswer}
                        onChange={(e) => setShortAnswer(e.target.value)}
                        placeholder="Optional correct answer"
                    />
                </div>
            )}

            <button type="submit">{isEditMode ? 'Update Question' : 'Create Question'}</button>
        </form>
    );
};

export default CreateExam;
