import React, { useState } from "react";

function ExamSettings() {
	const [startTime, setStartTime] = useState("");
	const [duration, setDuration] = useState(60);

	const saveSettings = () => {
		// API call to save settings
		console.log({ startTime, duration });
	};

	return (
		<div className="p-8 min-h-screen bg-gray-100 flex justify-center items-center">
			<div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
				<h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
					Exam Settings
				</h2>

				<div className="space-y-6">
					<div className="flex flex-col">
						<label className="text-gray-700 mb-2">Start Time:</label>
						<input
							type="datetime-local"
							value={startTime}
							onChange={(e) => setStartTime(e.target.value)}
							className="p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300"
						/>
					</div>

					<div className="flex flex-col">
						<label className="text-gray-700 mb-2">Duration (minutes):</label>
						<input
							type="number"
							value={duration}
							onChange={(e) => setDuration(e.target.value)}
							className="p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300"
						/>
					</div>
				</div>

				<button
					onClick={saveSettings}
					className="mt-8 w-full bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
				>
					Save Settings
				</button>
			</div>
		</div>
	);
}

export default ExamSettings;
