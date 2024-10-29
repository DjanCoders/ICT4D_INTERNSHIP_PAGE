import React, { useState } from "react";
import "./editExam.scss"; // You can remove this if the styles are now handled by Tailwind

function ExamEditor() {
	const [questions, setQuestions] = useState([]);
	const [questionText, setQuestionText] = useState("");
	const [options, setOptions] = useState(["", "", "", ""]); // Default 4 options
	const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
	const [mcq, SetMcq] = useState(true);

	const addQuestion = () => {
		const newQuestion = {
			text: questionText,
			options: mcq ? [...options] : [],
			correctAnswerIndex: mcq ? correctAnswerIndex : null,
			type: mcq ? "MCQ" : "Descriptive",
		};
		setQuestions([...questions, newQuestion]);
		setQuestionText("");
		setOptions(["", "", "", ""]);
		setCorrectAnswerIndex(null);
	};

	const handleOptionChange = (index, value) => {
		const newOptions = [...options];
		newOptions[index] = value;
		setOptions(newOptions);
	};

	return (
		<div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
			<h1 className="text-3xl font-bold text-gray-800 mb-8">Exam Editor</h1>

			<div className="flex space-x-4 mb-6">
				<button
					onClick={() => SetMcq(true)}
					className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
						mcq
							? "bg-blue-500 text-white shadow-lg"
							: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
					}`}
				>
					MCQs
				</button>
				<button
					onClick={() => SetMcq(false)}
					className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
						!mcq
							? "bg-blue-500 text-white shadow-lg"
							: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
					}`}
				>
					Descriptive
				</button>
			</div>

			{mcq ? (
				<>
					<input
						type="text"
						value={questionText}
						onChange={(e) => setQuestionText(e.target.value)}
						placeholder="Enter question text"
						className="w-full max-w-lg p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
					/>

					<h3 className="text-xl font-semibold text-gray-800 mb-2">Options:</h3>
					{options.map((option, index) => (
						<div key={index} className="flex items-center space-x-2 mb-3">
							<input
								type="text"
								value={option}
								onChange={(e) => handleOptionChange(index, e.target.value)}
								placeholder={`Option ${index + 1}`}
								className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
							/>
							<label className="flex items-center space-x-1 text-gray-700">
								<input
									type="radio"
									name="correctAnswer"
									checked={correctAnswerIndex === index}
									onChange={() => setCorrectAnswerIndex(index)}
									className="text-green-500 focus:ring-green-300"
								/>
								<span>Is it answer?</span>
							</label>
						</div>
					))}
					<button
						onClick={addQuestion}
						className="mt-4 px-8 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
					>
						Add Question
					</button>
				</>
			) : (
				<div className="w-full max-w-lg">
					<textarea
						value={questionText}
						onChange={(e) => setQuestionText(e.target.value)}
						placeholder="Enter question text"
						className="w-full h-40 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
					></textarea>
					<button
						onClick={addQuestion}
						className="mt-4 px-8 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
					>
						Add Question
					</button>
				</div>
			)}

			<div className="w-full max-w-lg mt-8">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Added Questions
				</h2>
				<ul className="space-y-4">
					{questions.map((q, index) => (
						<li
							key={index}
							className="p-4 bg-white shadow-md rounded-lg border"
						>
							<strong className="block mb-2 text-lg">{q.text}</strong>
							{q.type === "MCQ" ? (
								<ul className="list-disc list-inside space-y-1">
									{q.options.map((option, optIndex) => (
										<li key={optIndex} className="flex items-center space-x-2">
											<span>{option}</span>
											{optIndex === q.correctAnswerIndex && (
												<span className="text-green-500 font-bold">
													(Answer)
												</span>
											)}
										</li>
									))}
								</ul>
							) : (
								<p className="text-gray-600 italic">Answer: Free Text</p>
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default ExamEditor;
