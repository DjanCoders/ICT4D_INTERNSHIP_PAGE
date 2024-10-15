import { FaNetworkWired, FaCertificate, FaTools } from "react-icons/fa";
import styles from "./featurescard.module.css"; // Import CSS module for local scoped styling

type InternProps = {
	name: string;
	description: string;
	icon: string;
};

const FeaturesCard = ({ name, description, icon }: InternProps) => {
	const renderIcon = () => {
		switch (icon) {
			case "network":
				return <FaNetworkWired className={styles.icon} />;
			case "certificate":
				return <FaCertificate className={styles.icon} />;
			case "tools":
				return <FaTools className={styles.icon} />;
			default:
				return <FaTools className={styles.icon} />;
		}
	};

	return (
		<div
			className={`text-left p-8 bg-lime-50 rounded-lg shadow-md ${styles.card}`}
		>
			<div
				className={`flex justify-center items-center mb-5 ${styles.iconContainer}`}
			>
				{renderIcon()}
			</div>
			<h2 className="font-bold text-2xl my-2">{name}</h2>
			<p>{description}</p>
		</div>
	);
};

export default FeaturesCard;
