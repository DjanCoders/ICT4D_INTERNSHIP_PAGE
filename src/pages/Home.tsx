import { FAQ } from "../components/FAQs";
import Hero from "../components/Hero";
import InternFeatures from "../components/InternFeatures";
import Services from "../components/Services";
import { faqData } from "../data/faqs";

const Home = () => {
	return (
		<section className="mx-auto w-9/10 overflow-x-hidden">
			<main className="w-9/10 mx-auto">
				<Hero />
				<h2 className="text-4xl font-bold my-6">Our Intenship Areas</h2>
				<Services />
			</main>
			<article className="w-910 mx-auto my-20">
				<InternFeatures />
			</article>
			<article>
				<FAQ faqs={faqData} />
			</article>
			<footer>
				
			</footer>
		</section>
	);
};

export default Home;
