import { internAdvs } from "../data/sample";
import FeaturesCard from "./FeaturesCard";

const InternFeatures = () => {
  return (
    <>
      <span className="text-green-500 font-extrabold">Features</span>
      <h2 className="text-4xl font-bold mb-8">Features Of Our Internships</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between m-6 gap-8 my-6">
        {internAdvs.map((adv, index) => (
          <FeaturesCard key={index} {...adv} />
        ))}
      </div>
    </>
  );
};

export default InternFeatures;
