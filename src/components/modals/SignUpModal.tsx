import { useState } from "react";
import { register,login } from "../../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ErrorsType } from "../../types";
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
	const [passwordConfirm, setPasswordConfirm] = useState(""); // Password confirmation state
	const [username, setUsername] = useState("");
    const [errors, setErrors] = useState<ErrorsType>({});
	const { setToken, setRefreshToken } = useAuth();

	const navigate = useNavigate();

	const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrors({}); // Reset errors

		// Check if passwords match
		if (password !== passwordConfirm) {
			setErrors({ passwordConfirm: "Passwords do not match" });
			return;
		}

		try {
			await register({
				email,
				password,
				username,
			});
			const response = await login({ email, password });
			const { access, refresh } = response.data;
            localStorage.setItem("accessToken", access);
            localStorage.setItem("refreshToken", refresh);
            setToken(access);
            setRefreshToken(refresh);
			navigate("/");
			onClose(false);
		} catch (error) {
            setErrors(error as ErrorsType); // Set error messages
		}
	};

	return (
		<>
			{isOpen && (
				<div className="fixed z-50 inset-0 overflow-y-auto">
					{/* Modal content */}
					<div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
						{/* Close Button */}
						<div className="absolute top-3 right-3">
						<button
                                    type="button"
                                    className="absolute top-2 right-2 -mt-3 -mr-3 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                                    onClick={handleClose}
                                >
                                    <span className="sr-only">Close</span>
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
						</div>

						<div className="mt-3 text-center sm:mt-5">
							<h3 className="text-lg mb-4 leading-6 font-medium text-gray-900">
								Sign Up
							</h3>
							<div>
								<form onSubmit={handleSignup} method="POST" className="max-w-full bg-transparent text-left space-y-0">
									{/* Username */}
									<div>
										<label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
										<input
											id="username"
											name="username"
											type="text"
											autoComplete="username"
											required
											className={`appearance-none block w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
											placeholder="jdoe"
											value={username}
											onChange={(e) => setUsername(e.target.value)}
										/>
										{errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
									</div>

									{/* Email */}
									<div>
										<label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
										<input
											id="email"
											name="email"
											type="email"
											autoComplete="email"
											required
											className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
											placeholder="you@example.com"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
										{errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
									</div>

									{/* Password */}
									<div>
										<label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
										<input
											id="password"
											name="password"
											type="password"
											autoComplete="new-password"
											required
											className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
											placeholder="********"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
										{errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
									</div>

									{/* Confirm Password */}
									<div>
										<label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">Confirm Password</label>
										<input
											id="passwordConfirm"
											name="passwordConfirm"
											type="password"
											autoComplete="new-password"
											required
											className={`appearance-none block w-full px-3 py-2 border ${errors.passwordConfirm ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
											placeholder="********"
											value={passwordConfirm}
											onChange={(e) => setPasswordConfirm(e.target.value)}
										/>
										{errors.passwordConfirm && <p className="text-red-500 text-xs mt-1">{errors.passwordConfirm}</p>}
									</div>

									{/* Submit Button */}
									<div>
										<button
											type="submit"
											className="w-full mt-10 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500"
										>
											Sign up
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SignUpModal;
