import { FAQ } from "../components/FAQs";
import Hero from "../components/Hero";
import InternFeatures from "../components/InternFeatures";
import Navbar from "../components/NavBar";
import Services from "../components/Services";
import { faqData } from "../data/faqs";

const Home = () => {
  return (
    <section className='mx-auto'>
      <header className='fixed w-full top-0 right-0'>
        <Navbar />
      </header>
      <main className='main w-9/10 mx-auto'>
        <Hero />
        <h2 className='text-4xl font-bold my-6'>Our Intenship Areas</h2>
        <Services />
      </main>
      <article className='w-9/10 mx-auto my-20'>
        <InternFeatures />
      </article>
      <article>
        <FAQ faqs={faqData} />
      </article>
      <footer></footer>
    </section>
  );
};

export default Home;
