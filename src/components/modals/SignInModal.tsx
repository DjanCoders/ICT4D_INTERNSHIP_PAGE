import { useState } from "react";
import { login } from "../../api";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const SignInModal = ({
    isOpen,
    onClose,
    setShowSignUpModal,
    setShowForgotPasswordModal,
}: {
    isOpen: boolean;
    onClose: (arg1: boolean) => void;
    setShowSignUpModal: (arg1: boolean) => void;
    setShowForgotPasswordModal: (arg1: boolean) => void;
}) => {
    const handleClose = () => onClose(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setToken, setRefreshToken } = useAuth();
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("");
    
        try {
            const response = await login({ email, password });
            const { access, refresh } = response.data;
            localStorage.setItem("accessToken", access);
            localStorage.setItem("refreshToken", refresh);
            setToken(access);
            setRefreshToken(refresh);
    
            // Check for a stored redirect path
            const redirectPath = localStorage.getItem('redirectPath');
            if (redirectPath) {
                localStorage.removeItem('redirectPath'); // Clear the stored path after using it
                navigate(redirectPath); // Navigate to the stored path
            } else {
                navigate("/"); // Default to home page if no path is stored
            }
    
            onClose(false); // Close the sign-in modal
        } catch (error) {
            setMessage("Password or email doesn’t match");
        }
    };
    

    const openSignUp = () => {
        onClose(false);
        setShowSignUpModal(true);
    };

    const openForgotPassword = () => {
        onClose(false);
        setShowForgotPasswordModal(true);
    };

    return (
        <>
            {isOpen && (
                <div className="fixed z-50 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-300 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>

                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:mb-0 sm:align-middle sm:max-w-sm sm:w-full">
                            <div>
                                <button
                                    type="button"
                                    className="absolute top-2 right-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                                    onClick={handleClose}
                                >
                                    <span className="sr-only">Close</span>
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <div className="mt-3 text-center sm:mt-5">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Sign In</h3>
                                    <h3 style={{ color: "red" }}>{message}</h3>
                                    <form onSubmit={handleLogin} className="mt-4 space-y-4">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block w-full px-3 py-2 border rounded-md shadow-sm"
                                            required
                                        />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full px-3 py-2 border rounded-md shadow-sm"
                                            required
                                        />
                                        <button type="submit" className="w-full px-4 py-2 text-white bg-green-600 rounded-md">
                                            Sign In
                                        </button>
                                    </form>
                                    <p className="mt-4 text-sm text-gray-600">
                                        Don’t have an account?{" "}
                                        <span className="text-green-600 cursor-pointer hover:underline" onClick={openSignUp}>
                                            Sign Up
                                        </span>
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        <span className="text-green-600 cursor-pointer hover:underline" onClick={openForgotPassword}>
                                            Forgot Password?
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SignInModal;
