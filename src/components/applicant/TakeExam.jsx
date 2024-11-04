import React, { useState, useEffect } from "react";
import "./takeExam.scss";
import { getQuestions, submitQuesionsAnswer } from "../../api";

const TakeExam = () => {
	const [questionsByCategory, setQuestionsByCategory] = useState([]);
	const [answers, setAnswers] = useState({});
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState("");
	const [hasError, setHasError] = useState(false);
	const [errors, setErrors] = useState({});
	const [examStarted, setExamStarted] = useState(false);
	const [timeRemaining, setTimeRemaining] = useState(0);
	const [isTimerFinished, setIsTimerFinished] = useState(false);

	const startExam = () => {
		setExamStarted(true);
		startTimer();
	};

	const startTimer = () => {
		const timer =
			questionsByCategory[0].mcq_questions.length * 60 +
			questionsByCategory[0].desc_questions.length * 120;

		setTimeRemaining(timer);
	};

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await getQuestions();
				setQuestionsByCategory(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching questions", error);
				setLoading(false);
			}
		};
		fetchQuestions();
	}, []);
	useEffect(() => {
		let timerId;
		if (timeRemaining > 0 && examStarted) {
			timerId = setInterval(() => setTimeRemaining((prev) => prev - 1), 1000);
		} else {
			setIsTimerFinished((prev) => !prev);
		}
		return () => clearInterval(timerId);
	}, [examStarted, timeRemaining]);

	const handleMCQChange = (questionId, optionId) => {
		setAnswers((prevAnswers) => ({
			...prevAnswers,
			[questionId]: { ...prevAnswers[questionId], mcq_answer: optionId },
		}));
		setErrors((prevErrors) => ({ ...prevErrors, [questionId]: null }));
	};

	const handleDescChange = (questionId, value) => {
		setAnswers((prevAnswers) => ({
			...prevAnswers,
			[questionId]: { ...prevAnswers[questionId], desc_answer: value },
		}));
		setErrors((prevErrors) => ({ ...prevErrors, [questionId]: null }));
	};

	const validateAnswers = () => {
		let isValid = true;
		let validationErrors = {};

		questionsByCategory.forEach((category) => {
			category.mcq_questions.forEach((question) => {
				if (!answers[question.id]?.mcq_answer) {
					validationErrors[question.id] = "Please answer this question";
					isValid = false;
				}
			});
			category.desc_questions.forEach((question) => {
				if (!answers[question.id]?.desc_answer) {
					validationErrors[question.id] = "Please answer this question";
					isValid = false;
				}
			});
		});

		setErrors(validationErrors);
		return isValid;
	};

	const handleSubmit = async () => {
		setMessage("");
		setHasError(false);

		if (!validateAnswers()) {
			setMessage("Please answer all required questions.");
			setHasError(true);
			return;
		}

		const formattedAnswers = [];

		questionsByCategory.forEach((category) => {
			category.mcq_questions.forEach((question) => {
				const answer = answers[question.id];
				if (answer) {
					const selectedOption = question.options.find(
						(option) => option.id === answer.mcq_answer
					);
					formattedAnswers.push({
						mcq_question: question.id,
						mcq_question_text: question.text,
						descriptive_question: null,
						desc_question_text: null,
						desc_answer: null,
						mcq_answer: selectedOption ? selectedOption.id : null,
					});
				}
			});

			category.desc_questions.forEach((question) => {
				const answer = answers[question.id];
				if (answer) {
					formattedAnswers.push({
						mcq_question: null,
						mcq_question_text: null,
						descriptive_question: question.id,
						desc_question_text: question.text,
						desc_answer: answer.desc_answer || null,
						mcq_answer: null,
					});
				}
			});
		});

		try {
			const response = await submitQuesionsAnswer(formattedAnswers);
			console.log(formattedAnswers);
			setMessage(response.data.message);
		} catch (error) {
			setMessage("An error occurred while submitting the exam.");
			setHasError(true);
		}
	};

	if (loading) return <p>Loading questions...</p>;
	if (isTimerFinished) {
		return (
			<p className="text-orange-400 text-lg text-center mt-5 font-sans">
				Thank you for your time. The allotted time has now ended.
			</p>
		);
	}
	if (!examStarted) {
		return (
			<div className="start-exam my-24">
				<button
					onClick={startExam}
					className="btn px-4 py-2 border bg-gradient-to-r from-blue-500 to-blue-300 hover:bg-gradient-to-r transition-all duration-500 hover:from-blue-300 hover:to-blue-500 rounded-xl"
				>
					Start Exam
				</button>
			</div>
		);
	}
	if (questionsByCategory.length === 0) {
		return (
			<div
				style={{
					textAlign: "center",
					padding: "20px",
					backgroundColor: "#f9f9f9",
					borderRadius: "8px",
					boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
				}}
			>
				<h1 style={{ color: "#555", fontSize: "1.5rem" }}>
					<b>No Questions Available</b>
				</h1>
				<p style={{ color: "#777", fontSize: "1rem" }}>
					Currently, there are no questions available for this category. <br />
					Please check back later or explore other categories.
				</p>
			</div>
		);
	}

	return (
		<div className="take-exam">
			<h1>Take Exam</h1>
			<form onSubmit={(e) => e.preventDefault()}>
				{questionsByCategory.map((category) => {
					const hasMCQ = category.mcq_questions.length > 0;
					const hasDesc = category.desc_questions.length > 0;
					const categoryClass = !hasMCQ
						? "full-width-desc"
						: !hasDesc
						? "full-width-mcq"
						: "";

					return (
						<div key={crypto.randomUUID()} className="take-exam-info relative">
							<div className="timer text-2xl font-mono tracking-wide py-2 absolute top-1 right-3 border-2 border-gray-300 rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 shadow-lg text-white font-bold text-center w-32 flex items-center justify-center">
								{Math.floor(timeRemaining / 60)}:
								{String(timeRemaining % 60).padStart(2, "0")}
							</div>
							<h1>{category.category_name}</h1>

							<div
								key={category.category_name}
								className={`category ${categoryClass} flex flex-col justify-center lg:flex-row`}
							>
								{hasMCQ && (
									<div className="flex-1 max-W-5xl">
										<h2>Multiple Choice Questions</h2>
										{category.mcq_questions.map((question) => (
											<div key={question.id} className="question">
												<p>{question.text}</p>
												{question.options.map((option) => (
													<label key={option.id}>
														<input
															className="option"
															type="radio"
															name={`mcq-${question.id}`}
															checked={
																answers[question.id]?.mcq_answer === option.id
															}
															onChange={() =>
																handleMCQChange(question.id, option.id)
															}
														/>
														{option.text}
													</label>
												))}
												{errors[question.id] && (
													<p style={{ color: "red" }}>{errors[question.id]}</p>
												)}
											</div>
										))}
									</div>
								)}

								{hasDesc && (
									<div className="flex-1">
										<h2>Descriptive Questions</h2>
										{category.desc_questions.map((question) => (
											<div key={question.id} className="question">
												<p>{question.text}</p>
												<textarea
													placeholder="Write your answer here"
													rows="3"
													value={answers[question.id]?.desc_answer || ""}
													onChange={(e) =>
														handleDescChange(question.id, e.target.value)
													}
												/>
												{errors[question.id] && (
													<p style={{ color: "red" }}>{errors[question.id]}</p>
												)}
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					);
				})}
				<button type="button" onClick={handleSubmit}>
					Submit Exam
				</button>
			</form>
			{message && (
				<h2 style={{ color: hasError ? "red" : "green" }}>{message}</h2>
			)}
		</div>
	);
};

export default TakeExam;
