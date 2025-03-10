import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import { getInternships } from "../api";

const Services = () => {
	const [internships, setInternships] = useState<
		{ title: string; description: string; id: number }[]
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
	if (internships.length === 0) {
		return <p>Loading....</p>;
	}
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{internService}
		</div>
	);
};

export default Services;
