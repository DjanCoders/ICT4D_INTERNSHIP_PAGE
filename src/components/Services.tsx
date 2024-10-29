import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import { getInternships } from "../api";

const Services = () => {
	const [internships, setInternships] = useState<
		{ title: string; description: string }[]
	>([]);

	useEffect(() => {
		const fetchInternships = async () => {
			const response = await getInternships();
			setInternships(response.data);
		};

		fetchInternships();
	}, []);

	const internService = internships.map((internship, index) => (
		<ServiceCard key={index} service={internship} />
	));

	return (
		<div className="flex flex-col md:grid grid-cols-3 flex-wrap gap-8">
			{internService}
		</div>
	);
};

export default Services;
