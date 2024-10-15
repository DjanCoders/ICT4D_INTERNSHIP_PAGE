import { useState } from "react";
import { register } from "../../api";
import { useNavigate } from "react-router-dom";

const SignUpModal = ({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: (arg1: boolean) => void;
}) => {
	const handleClose = () => {
		onClose(false);
	};

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const navigate = useNavigate();

	const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await register({
				email,
				password,
				username,
				first_name,
				last_name,
			});
			navigate("/profile");
			onClose(false);
		} catch (error) {
			console.error("Error signin up:", error);
		}
	};

	return (
		<>
			{isOpen && (
				<div className="fixed z-50 inset-0 overflow-y-auto">
					<div className="flex items-center justify-center px-4 pt-4 text-center sm:block sm:p-0">
						<div
							className="fixed inset-0 transition-opacity"
							aria-hidden="true"
						>
							<div className="absolute inset-0 bg-gray-200 opacity-75"></div>
						</div>

						<span
							className="hidden sm:inline-block sm:align-middle sm:h-screen"
							aria-hidden="true"
						>
							&#8203;
						</span>

						<div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
							<div className="space-y-0">
								<button
									type="button"
									className="absolute top-2 right-2 -mt-3 -mr-3 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
									onClick={handleClose}
								>
									<span className="sr-only">Close</span>
									<svg
										className="h-6 w-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
								<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
									<svg
										className="h-6 w-6 text-green-600"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<div className="mt-3 text-center sm:mt-5">
									<h3 className="text-lg mb-4 leading-6 font-medium text-gray-900">
										Sign Up
									</h3>
									<div>
										<form
											onSubmit={handleSignup}
											method="POST"
											className="max-w-full bg-transparent text-left space-y-0"
										>
											<div>
												<div>
													<label
														htmlFor="firstname"
														className="block text-sm font-medium text-gray-700"
													>
														First Name
													</label>
													<div>
														<input
															id="firstname"
															name="firstname"
															type="text"
															autoComplete="true"
															required
															className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
															placeholder="John"
															value={first_name}
															onChange={(e) => setFirstName(e.target.value)}
														/>
													</div>
												</div>

												<div>
													<label
														htmlFor="lastname"
														className="block text-sm font-medium text-gray-700"
													>
														Last Name
													</label>
													<div>
														<input
															id="lastname"
															name="lastname"
															type="text"
															autoComplete="true"
															required
															className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
															placeholder="Doe"
															value={last_name}
															onChange={(e) => setLastName(e.target.value)}
														/>
													</div>
												</div>

												<div>
													<label
														htmlFor="username"
														className="block text-sm font-medium text-gray-700"
													>
														Username
													</label>
													<div>
														<input
															id="username"
															name="username"
															type="text"
															autoComplete="username"
															required
															className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
															placeholder="jdoe"
															value={username}
															onChange={(e) => setUsername(e.target.value)}
														/>
													</div>
												</div>

												<div>
													<label
														htmlFor="email"
														className="block text-sm font-medium text-gray-700"
													>
														Email address
													</label>
													<div>
														<input
															id="email"
															name="email"
															type="email"
															autoComplete="email"
															required
															className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
															placeholder="you@example.com"
															value={email}
															onChange={(e) => setEmail(e.target.value)}
														/>
													</div>
												</div>

												<div>
													<label
														htmlFor="password"
														className="block text-sm font-medium text-gray-700"
													>
														Password
													</label>
													<div>
														<input
															id="password"
															name="password"
															type="password"
															autoComplete="new-password"
															required
															className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
															placeholder="********"
															value={password}
															onChange={(e) => setPassword(e.target.value)}
														/>
													</div>
												</div>
												<div>
													<button
														type="submit"
														className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500"
													>
														Sign up
													</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SignUpModal;
