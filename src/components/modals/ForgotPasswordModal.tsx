import { useState } from "react";
import { updatePassword ,login} from "../../api"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ForgotPasswordModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const { setToken, setRefreshToken } = useAuth();
    const navigate = useNavigate();

    const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setMessage('');
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            setHasError(true)
            return;
        }
        try {
            // Call the API to update the password
            await updatePassword(email, newPassword);
            setHasError(false)

            setMessage("Password updated successfully!");
            const response = await login({ email, password: newPassword });
            const { access, refresh } = response.data;
            localStorage.setItem("accessToken", access);
            localStorage.setItem("refreshToken", refresh);
            setToken(access);
            setRefreshToken(refresh);
			navigate("/");

            onClose();


            // Optionally close the modal or reset form fields here
        } catch (error) {
            console.error("Error updating password:", error);
            setMessage("Failed to update password, please try again.");
            setHasError(true)

        }
    };

    return (
        isOpen && (
            <div className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-300 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full">
                        <button
                            type="button"
                            className="absolute top-2 right-2 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Reset Password</h3>
                        {message && <p style={{color:hasError?"red":"green"}} className=" mt-4">{message}</p>}
                        <form onSubmit={handleUpdatePassword} className="mt-4 space-y-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-3 py-2 border rounded-md shadow-sm"
                                required
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="block w-full px-3 py-2 border rounded-md shadow-sm"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="block w-full px-3 py-2 border rounded-md shadow-sm"
                                required
                            />
                            <button type="submit" className="w-full px-4 py-2 text-white bg-green-600 rounded-md">
                                Update Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
};

export default ForgotPasswordModal;
