const Hero = () => {
	return (
		<div className="text-center mx-12 -mt-24 h-screen flex flex-col items-center justify-center md:w-3/4 md:mx-auto">
			<small className="text-green-500 font-extrabold">Intenships</small>
			<h2 className="text-5xl font-bold mb-8">Our Internships</h2>
			<div className="note">
				<p className="text-2xl">
					Our internships are available in a range of fields, including Web
					Development, Machine Learning, Data Science, and more. Interns will
					have the chance to work on real-world projects, collaborate with
					teams, and gain valuable insights into their respective industries.
				</p>
			</div>
			<div className="social-links flex mt-12 gap-4">
				<div>
					<button className="flex items-center justify-center w-32 border-[2px] border-gray-900 px-4 py-2 rounded-xl hover:bg-blue-100">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							className="w-5 h-5 text-blue-600 mr-2"
							viewBox="0 0 24 24"
						>
							<path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.326 24H12.81v-9.294H9.692v-3.622h3.118V8.413c0-3.084 1.884-4.765 4.64-4.765 1.32 0 2.453.098 2.784.143v3.23l-1.91.001c-1.5 0-1.791.713-1.791 1.76v2.309h3.582l-.466 3.622h-3.116V24h6.104C23.406 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
						</svg>
						Facebook
					</button>
				</div>
				<div>
					<button className="flex items-center justify-center w-32 border-[2px] border-gray-900 px-4 py-2 rounded-xl hover:bg-gray-100">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							className="w-5 h-5 text-gray-700 mr-2"
							viewBox="0 0 24 24"
						>
							<path d="M12 12.713L0 5.647V18c0 1.104.897 2 2 2h20c1.103 0 2-.896 2-2V5.647l-12 7.066zm0-2.427L24 3H0l12 7.286z" />
						</svg>
						Email
					</button>
				</div>
			</div>
		</div>
	);
};

export default Hero;
