import { useNavigate } from "react-router-dom";

const ServiceCard = ({
	service,
}: {
	service: { name: string; services: string[] };
}) => {
	const navigate = useNavigate();

	const navigateToApplyForm = () => {
		navigate("/apply");
	};
	return (
		<div className="flex-1 relative border-[2px] hover:scale-105 border-gray-400 rounded-lg  p-6 bg-white transition-all transform hover:-translate-y-2 -z-50">
			<h2 className="text-3xl font-bold my-4 text-gray-800">{service.name}</h2>
			<ul className="list-disc my-6 list-inside space-y-2 text-gray-600 text-left mx-3">
				{service.services.map((serv, index) => {
					return <li key={index}>{serv}</li>;
				})}
			</ul>
			<button
				onClick={navigateToApplyForm}
				type="button"
				className="px-8 py-3 flex bg-gradient-to-r from-green-400 to-lime-100 text-black font-semibold rounded-lg shadow-md hover:from-lime-500 hover:to-lime-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-transform hover:scale-105"
			>
				Apply Now
			</button>
		</div>
	);
};

export default ServiceCard;
