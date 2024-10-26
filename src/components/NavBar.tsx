import { useState } from "react";
import { Link } from "react-router-dom";

import profile from "/assets/default.png";
import SignInModal from "./modals/SignInModal";
import SignUpModal from "./modals/SignUpModal";
import { CloseSVGs, OpenSVGs } from "./SVGs";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [showSignInModal, setShowSignInModal] = useState(false);
	const [showSignUpModal, setShowSignUpModal] = useState(false);

	const openSignInModal = () => {
		setShowSignInModal(true);
		setIsOpen(false); // Close mobile menu if open
	};

	const closeSignInModal = () => setShowSignInModal(false);
	const openSignUpModal = () => {
		setShowSignUpModal(true);
		setIsOpen(false); // Close mobile menu if open
	};

	const closeSignUpModal = () => setShowSignUpModal(false);

	return (
		<nav className="bg-gray-500 mb-20">
			<div className="m7xl mx-auto px-2 sm:px-6 lg:px-8">
				<div className="relative flex items-center justify-between h-16">
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							type="button"
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							aria-controls="mobile-menu"
							aria-expanded="false"
						>
							<span className="sr-only">Open main menu</span>
							{!isOpen ? <OpenSVGs /> : <CloseSVGs />}
						</button>
					</div>
					<div className="flex-1 my-5 flex items-center justify-center sm:items-stretch sm:justify-start gap-5">
						<div className="flex-shrink-0 text-white">
							<Link to="/">ICT4D</Link>
						</div>
						<div className="flex-shrink-0 text-white">
						<Link to="/admin/exam-editor">Edit Exam</Link>
						</div>
					</div>
					<div className="absolute hidden sm:flex inset-y-0 right-0 my-3 gap-5 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						<div>
							<a
								href="#"
								className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
								onClick={openSignInModal}
							>
								Sign In
							</a>
						</div>
						<div>
							<a
								href="#"
								className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
								onClick={openSignUpModal}
							>
								Sign Up
							</a>
						</div>
						<div className="mt-[6px]">
							<Link
								to="/profile"
								type="button"
								className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
							>
								<img
									className="h-8 w-8 rounded-full"
									src={profile}
									alt="profile"
								/>
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{isOpen && (
				<div className="sm:hidden" id="mobile-menu">
					<div className="px-2 pt-2 pb-3 space-y-1">
						<a
							href="#"
							className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
						>
							Home
						</a>
						<a
							href="#"
							className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
						>
							Features
						</a>
						<a
							href="#"
							className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
							onClick={openSignInModal}
						>
							Sign In
						</a>
						<a
							href="#"
							className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
							onClick={openSignUpModal}
						>
							Sign Up
						</a>
						<Link
							className="flex flex-col items-center justify-center"
							to="/profile"
						>
							<button
								type="button"
								className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
							>
								<span className="sr-only">Open user menu</span>
								<img
									className="h-8 w-8 rounded-full"
									src={profile}
									alt="profile"
								/>
							</button>
							<small className="text-gray-200">Profile</small>
						</Link>
					</div>
				</div>
			)}

			{/* Sign In Modal */}
			<SignInModal isOpen={showSignInModal} onClose={closeSignInModal} />

			{/* Sign Up Modal */}
			<SignUpModal isOpen={showSignUpModal} onClose={closeSignUpModal} />
		</nav>
	);
};

export default Navbar;
