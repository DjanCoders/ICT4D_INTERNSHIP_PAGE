const Hero = () => {
  return (
    <div className="text-center mx-12 p-10 flex flex-col items-center justify-center md:w-3/4 md:mx-auto">
      <small className="text-green-500 font-extrabold">Internships</small>
      <h2 className="text-5xl font-bold mb-8">Our Internships</h2>
      <div className="note">
        <p className="text-2xl">
          Our internships are available in a range of fields, including Web
          Development, Machine Learning, Data Science, and more. Interns will
          have the chance to work on real-world projects, collaborate with
          teams, and gain valuable insights into their respective industries.
        </p>
      </div>
    </div>
  );
};

export default Hero;
