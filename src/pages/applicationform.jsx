// src/ApplicationForm.js
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import formSchema from "../validation";
import coderLogo from "../components/Images/coder-logo.jpg";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ApplicationForm = () => {
	const location = useLocation();
	const title=location.state?.title;// Access the title from the state
	const id=location.state?.id;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(formSchema),
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submissionMessage, setSubmissionMessage] = useState(" ");
	const [hasError, setHasError] = useState(false);
	const { token } = useAuth();


	const onSubmit = async (data) => {
		setIsSubmitting(true);
		const formData = new FormData();
		formData.append("applly_for", id);
		// Check if files exist
		if (data.resume && data.resume.length > 0) {
			formData.append("resume", data.resume[0]);
		} 

		if (data.cover_letter && data.cover_letter.length > 0) {
			formData.append("cover_letter", data.cover_letter[0]);
		}

		formData.append("duration", Number(data.duration));
		formData.append("gpa", Number(data.gpa));
		for (const [key, value] of Object.entries(data)) {
			if (key !== "resume" && key !== "cover_letter") {
				formData.append(key, value);
			}
		}

		try {
			const response=await axios.post(
				"http://127.0.0.1:8000/api/internship-application/",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setSubmissionMessage(response.data.message);
			setHasError(false);
		} catch (error) {
			console.error("Error Creating:", error.response.data); // Log error response data
			setSubmissionMessage("Please correct the highlighted fields.");
			setHasError(true);
		} finally {
			setIsSubmitting(false);
		}
	};

	const renderError = (fieldName) => {
		return errors[fieldName] ? (
			<p className="text-red-500 text-sm">{errors[fieldName]?.message}</p>
		) : null;
	};
	return (
		<div className="form-wrapper flex flex-col lg:flex-row gap-8">
			<div className="left-bar w-3/4 md:w-[35%]">
				{/* Coder Image */}
				<img src={coderLogo} alt="Coder" className="coder-image" />

				{/* Basic Info */}
				<div className="info-section">
				{title && <h1>You are applying for: <strong>{title}</strong></h1>}
					<h3 className="font-bold text-lg">Eligibility Criteria</h3>
					<p>Open to students currently enrolled in a degree program.</p>

					<h3 className="font-bold text-lg mt-4">Company Overview</h3>
					<p>
						We are an innovative tech firm offering internships to aspiring
						developers.
					</p>

					<h3 className="font-bold text-lg mt-4">Key Dates</h3>
					<ul>
						<li>
							<strong>Application Start:</strong>
						</li>
						<li>
							<strong>Duration:</strong>{" "}
						</li>
					</ul>

					<h3 className="font-bold text-lg mt-4">FAQs</h3>
					<p>
						Check our FAQ section for any questions related to the application
						process.
					</p>
				</div>
			</div>

			<div className="Apply-form w-[85%] md:w-[55%] mx-auto md:mx-0">
				<h1>Internship Application </h1>
				<h2>Please complete the form below to apply for Internship with us.</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="w-full">
					<div className="full-name">
						<span>Full Name</span>
						<br />
						<label className="text-sm font-medium text-gray-1000">
							First Name:
						</label>
						<input
							type="text"
							{...register("first_name")}
							required
							className="appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
						/>
						{renderError("first_name")}
						<label className="text-sm font-medium text-gray-1000">
							Last Name:
						</label>
						<input
							type="text"
							{...register("last_name")}
							required
							className="appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
						/>
						{renderError("last_name")}
					</div>

					<div className="contact-address">
						<span>Contact Address</span>
						<br />
						<div>
							<label className="text-sm font-medium text-gray-1000">
								Email:
							</label>
							<input
								type="email"
								{...register("email")}
								required
								className="appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
							/>
							{renderError("email")}

							<label className="text-sm font-medium text-gray-1000">
								Phone:
							</label>
							<input
								type="tel"
								{...register("phone")}
								className="appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
							/>
							{renderError("phone")}

							<label className="text-sm font-medium text-gray-1000">
								Address:
							</label>
							<input
								type="text"
								{...register("address")}
								className="appearance-none adress-input px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
							/>
							{renderError("address")}
						</div>
					</div>

					<div className="school-info">
						<span>School Information</span>
						<div className="school-info-child">
							<label className="text-sm font-medium text-gray-1000">
								School/University:
							</label>
							<input
								type="text"
								{...register("school")}
								className="appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
							/>
							{renderError("school")}

							<label className="text-sm font-medium text-gray-1000">
								Degree:
							</label>
							<input
								type="text"
								{...register("degree")}
								className="appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
							/>
							{renderError("degree")}

							<label className="text-sm font-medium text-gray-1000">
								Major:
							</label>
							<input
								type="text"
								{...register("major")}
								className="appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
							/>
							{renderError("major")}

							<label className="text-sm font-medium text-gray-1000">
								CGPA:
							</label>
							<input
								type="text"
								{...register("gpa")}
								className="appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
							/>
							{renderError("gpa")}
						</div>
					</div>

					<div className="date-info">
						<span>Date Information</span>
						<br />
						<label className="text-sm font-medium text-gray-1000">
							Start Date:
						</label>
						<input
							type="date"
							{...register("start_date")}
							required
							className="appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
						/>
						{renderError("start_date")}

						<label className="text-sm font-medium text-gray-1000">
							Duration (months):
						</label>
						<input
							type="number"
							{...register("duration")}
							className="appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
						/>
						{renderError("duration")}
					</div>

					

					<div>
						<label className="text-sm font-medium text-gray-1000">
							Resume:
						</label>
						<input
							type="file"
							{...register("resume")}
							className="appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
						/>
						{renderError("resume")}
					</div>

					<div>
						<label className="text-sm font-medium text-gray-1000">
							Cover Letter:
						</label>
						<input
							type="file"
							{...register("cover_letter")}
							className="appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
						/>
						{renderError("cover_letter")}
					</div>

					<button className="form-button" type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Submitting..." : "Submit"}
					</button>
				</form>

				<p style={{ color: hasError ? "red" : "green" }}>{submissionMessage}</p>
			</div>
		</div>
	);
};

export default ApplicationForm;
