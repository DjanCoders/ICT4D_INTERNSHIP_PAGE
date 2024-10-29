import React, { useContext, useState } from "react";
import axios from "axios";
import { ColorContext } from "../../ColorContext/DarkContext";

const InternshipForm = () => {
	const { darkMode } = useContext(ColorContext);

	const colorStyle = {
		color: darkMode ? "#fff" : "#000",
	};

	const [internship, setInternship] = useState({
		title: "",
		description: "",
		start_date: "",
		end_date: "",
		location: "",
		is_active: true,
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setInternship({
			...internship,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/internships/",
				internship
			);
			alert("Internship created: " + response.data);
		} catch (error) {
			alert("Error creating internship: " + error);
		}
	};

	return (
		<div className="p-8 flex justify-center items-center min-h-screen bg-gray-100">
			<div className="w-full max-w-7xl rounded-lg">
				<h2
					className="text-3xl font-semibold mb-6 text-center"
					style={colorStyle}
				>
					Add Work Area
				</h2>

				<form
					className="max-w-3xl px-4 bg-gray-100 py-8"
					onSubmit={handleSubmit}
				>
					<div className="grid grid-cols-2 gap-6">
						<div className="flex flex-col">
							<label
								htmlFor="title"
								className="mb-2 text-left"
								style={colorStyle}
							>
								Title
							</label>
							<input
								type="text"
								name="title"
								placeholder="Enter title"
								value={internship.title}
								onChange={handleChange}
								required
								className="p-3 w-full border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
							/>
						</div>

						<div className="flex flex-col">
							<label
								htmlFor="description"
								className="mb-2 text-left"
								style={colorStyle}
							>
								Description
							</label>
							<textarea
								name="description"
								placeholder="Enter description"
								value={internship.description}
								onChange={handleChange}
								required
								className="p-3 w-full border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-6">
						<div className="flex flex-col">
							<label
								htmlFor="start_date"
								className="mb-2 text-left"
								style={colorStyle}
							>
								Start Date
							</label>
							<input
								type="date"
								name="start_date"
								value={internship.start_date}
								onChange={handleChange}
								required
								className="p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
							/>
						</div>

						<div className="flex flex-col">
							<label
								htmlFor="end_date"
								className="mb-2 text-left"
								style={colorStyle}
							>
								End Date
							</label>
							<input
								type="date"
								name="end_date"
								value={internship.end_date}
								onChange={handleChange}
								required
								className="p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
							/>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-6">
						<div className="flex flex-col">
							<label
								htmlFor="location"
								className="mb-2 text-left"
								style={colorStyle}
							>
								Location
							</label>
							<input
								type="text"
								name="location"
								placeholder="Enter location"
								value={internship.location}
								onChange={handleChange}
								required
								className="p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
							/>
						</div>

						<div className="flex items-center space-x-3">
							<label htmlFor="is_active" className="text-sm" style={colorStyle}>
								Active
							</label>
							<input
								type="checkbox"
								name="is_active"
								checked={internship.is_active}
								onChange={handleChange}
								className="w-5 h-5 text-green-500 focus:ring-2 focus:ring-green-300"
							/>
						</div>
					</div>
					<button
						type="submit"
						className="w-fit px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
					>
						Add Internship
					</button>
    				</form>
        <h2 style={{ color: hasError ? "red" : "green" }}>{ message}</h2>
			</div>
		</div>
	);
};

export default InternshipForm;
