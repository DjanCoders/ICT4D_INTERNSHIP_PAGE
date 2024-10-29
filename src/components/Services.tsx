import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import { getInternships } from "../api";

const Services = () => {
	const internService = internships.map((service) => (
		<ServiceCard service={service} />
	));
	return <div className="flex flex-col md:flex-row gap-8">{internService}</div>;
};

export default Services;
