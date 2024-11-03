// src/ApplicationForm.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import formSchema from "../validation";
import coderLogo from "../components/Images/coder-logo.jpg";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { applayForInternship } from "../api";

const ApplicationForm = () => {
	const location = useLocation();
	const title = location.state?.title; // Access the title from the state
	const id = location.state?.id;
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
	const onSubmit = async (data) => {
		setIsSubmitting(true);
		const formData = new FormData();
		
		// Append the internship ID
		formData.append("applly_for", id);
		formData.append("duration", data.duration);
		formData.append("gpa", data.gpa);

		// Append files if they exist
		if (data.resume && data.resume.length > 0) {
			formData.append("resume", data.resume[0]);
		}

		if (data.cover_letter && data.cover_letter.length > 0) {
			formData.append("cover_letter", data.cover_letter[0]);
		}

		// Append other form fields
		for (const key of Object.keys(data)) {
			if (key !== "resume" && key !== "cover_letter" && key !== "duration" && key !== "gpa") {
				formData.append(key, data[key]);
			}
		}

		try {
			const response = await applayForInternship(formData);
			setSubmissionMessage(response.data.message);
			setHasError(false);
		} catch (error) {
			console.error("Error Creating:", error.response?.data || error); // Log error response data if it exists
			setSubmissionMessage("Error Creating Application: " + (error.response?.data?.message || error.message));
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
					{title && (
						<h1>
							You are applying for: <strong>{title}</strong>
						</h1>
					)}
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

			<div className="Apply-form w-[85%] md:w-[50%] mx-auto md:mx-0 py-6 bg-stone-200">
				<h2 className="pb-3">
					Please complete the form below to apply for Internship with us.
				</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="w-full bg-stone-200">
					<div className="full-name lg:h-20 mb-0">
						<span>Full Name</span>
						<br />
						<div className="flex flex-col md:flex-row ml-6 justify-between">
							<div>
								<label className="text-sm font-medium text-gray-1000 md:pr-12">
									First Name:
								</label>
								<input
									type="text"
									{...register("first_name")}
									required
									className="appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
								/>
								{renderError("first_name")}
							</div>
							<div>
								<label className="text-sm font-medium pr-2">Last Name:</label>
								<input
									type="text"
									{...register("last_name")}
									required
									className="appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
								/>
								{renderError("last_name")}
							</div>
						</div>
					</div>

					<div className="contact-address lg:h-32">
						<span>Contact Address</span>
						<br />
						<div className="flex flex-wrap ml-6 justify-between">
							<div>
								<label className="text-sm font-medium text-gray-1000 md:pr-20">
									Email:
								</label>
								<input
									type="email"
									{...register("email")}
									required
									className="appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
								/>
								{renderError("email")}
							</div>
							<div className="">
								<label className="text-sm font-medium text-gray-1000 pr-4">
									Phone:
								</label>
								<input
									type="tel"
									{...register("phone")}
									className="appearance-none  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
								/>
								{renderError("phone")}
							</div>
							<div>
								<label className="text-sm font-medium text-gray-1000 md:pr-16">
									Address:
								</label>
								<input
									type="text"
									{...register("address")}
									className="appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
								/>
								{renderError("address")}
							</div>
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
						<div className="flex ml-6 justify-between">
							<label className="text-sm font-medium text-gray-1000 lg:pr-8">
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
