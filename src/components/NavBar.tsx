import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profile from "/assets/default.png";
import SignInModal from "./modals/SignInModal";
import SignUpModal from "./modals/SignUpModal";
import ForgotPasswordModal from "./modals/ForgotPasswordModal";
import { CloseSVGs, OpenSVGs } from "./SVGs";
import { useUser } from "../contexts/UserContextt.tsx";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, loading } = useUser();
  const { token, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [isForgotPasswordOpen, setShowForgotPasswordModal] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const openSignInModal = () => {
    setShowSignInModal(true);
    setIsOpen(false);
  };

  const closeSignInModal = () => setShowSignInModal(false);
  const openSignUpModal = () => {
    setShowSignUpModal(true);
    setIsOpen(false);
  };
  const closeSignUpModal = () => setShowSignUpModal(false);

  if (loading) {
    return <div>Loading...</div>;
  }
  const canTakeExam = token && !user?.user.is_superuser && user?.is_internee;

  return (
    <nav className="bg-gray-500 mb-20 z-50">
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
            {token && user?.user.is_superuser && (
              <div className="flex-shrink-0 text-white">
                <Link to="/admin">Admin Panel</Link>
              </div>
            )}
            {canTakeExam && (
              <div className="flex-shrink-0 text-white">
                <Link to="/applicant/take-exam">Take Exam </Link>
              </div>
            )}
          </div>
          <div className="absolute hidden sm:flex inset-y-0 right-0 my-3 gap-5 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {!token && (
              <div>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={openSignInModal}
                >
                  Sign In
                </a>
              </div>
            )}
            {!token && (
              <div>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={openSignUpModal}
                >
                  Sign Up
                </a>
              </div>
            )}
            {token && (
              <div>
                <button
                  className="flex-shrink-0 text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
            {token && (
              <div className="mt-[6px]">
                <Link
                  to="/profile"
                  type="button"
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <img
                    src={
                      user?.avatar instanceof File
                        ? URL.createObjectURL(user.avatar)
                        : user?.avatar || profile
                    }
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>

            {!token && (
              <div>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={openSignInModal}
                >
                  Sign In
                </a>
              </div>
            )}
            {!token && (
              <div>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={openSignUpModal}
                >
                  Sign Up
                </a>
              </div>
            )}
            {token && (
                <div>
                  <button
                    className="flex-shrink-0 text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) && (
                <Link
                  onClick={() => setIsOpen(false)}
                  className="flex flex-col items-center justify-center"
                  to="/profile"
                >
                  <button
                    type="button"
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      src={
                        user?.avatar instanceof File
                          ? URL.createObjectURL(user.avatar)
                          : user?.avatar || profile
                      }
                    />
                  </button>
                  <small className="text-gray-200">Profile</small>
                </Link>
              )}
          </div>
        </div>
      )}
      {/* Sign In Modal */}
      <SignInModal
        setShowForgotPasswordModal={setShowForgotPasswordModal}
        setShowSignUpModal={setShowSignUpModal}
        isOpen={showSignInModal}
        onClose={closeSignInModal}
      />
      {/* Sign Up Modal */}
      <SignUpModal isOpen={showSignUpModal} onClose={closeSignUpModal} />
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setShowForgotPasswordModal(false)}
      />
    </nav>
  );
};

export default Navbar;
