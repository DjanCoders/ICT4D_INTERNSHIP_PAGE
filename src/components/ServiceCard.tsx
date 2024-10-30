import { useNavigate } from "react-router-dom";

const ServiceCard = ({
	service,
}: {
	service: { title: string; description: string };
}) => {
	const navigate = useNavigate();

	const navigateToApplyForm = () => {
		navigate("/apply");
	};
	return (
		<div className="flex-1 relative cursor-pointer border-[2px] border-gray-400 rounded-lg  p-6 pb-24 bg-white transition-all transform hover:-translate-y-2">
			<h2 className="text-3xl font-bold my-4 text-gray-800">{service.title}</h2>
			{service.description}
			<button
				onClick={navigateToApplyForm}
				type="button"
				className="absolute bottom-2 left-1/3 px-8 z-50 py-3 flex bg-gradient-to-r from-blue-500 to-indigo-400 text-white font-semibold rounded-lg shadow-lg  focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-transform hover:scale-105"
			>
				Apply Now
			</button>
		</div>
	);
};

export default ServiceCard;
