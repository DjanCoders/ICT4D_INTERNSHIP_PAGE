import { internships } from "../data/sample";
import ServiceCard from "./ServiceCard";

const Services = () => {
	const internService = internships.map((service) => (
		<ServiceCard service={service} />
	));
	return (
		<div className="flex flex-col md:grid grid-cols-3 flex-wrap gap-8">
			{internService}
		</div>
	);
};

export default Services;
