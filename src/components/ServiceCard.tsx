import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SignInModal from "./modals/SignInModal";
import SignUpModal from "./modals/SignUpModal";
import ForgotPasswordModal from "./modals/ForgotPasswordModal";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";

const ServiceCard = ({
  service,
}: {
  service: { title: string; description: string; id: number };
}) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const { user, loading } = useUser();
  const [isForgotPasswordOpen, setShowForgotPasswordModal] = useState(false);



  const navigateToApplyForm = () => {
    if (!token) {
      localStorage.setItem('redirectPath', '/apply');
      setShowSignInModal(true);
      
    } else {
      navigate("/apply", { state: { title: service.title, id: service.id } });
    }
  };

  const closeSignInModal = () => setShowSignInModal(false);
  const closeSignUpModal = () => setShowSignUpModal(false);

  return (
    <>
      <div className="flex-1 relative cursor-pointer border-[2px] border-gray-400 rounded-lg p-6 pb-24 bg-white transition-all transform hover:-translate-y-2">
        <h2 className="text-3xl font-bold my-4 text-gray-800">
          {service.title}
        </h2>
        <p>{service.description}</p>
        {!user?.user.is_superuser && (
          <button
            onClick={navigateToApplyForm}
            type="button"
            className="absolute bottom-2 left-1/3 px-8 z-50 py-3 flex bg-gradient-to-r from-blue-500 to-indigo-400 text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-transform hover:scale-105"
          >
            Apply Now
          </button>
        )}
      </div>
      {/* Sign In Modal */}
      <SignInModal
        isOpen={showSignInModal}
        onClose={closeSignInModal}
        setShowSignUpModal={setShowSignUpModal}
        setShowForgotPasswordModal={setShowForgotPasswordModal} 
      />

      {/* Sign Up Modal */}
      <SignUpModal isOpen={showSignUpModal} onClose={closeSignUpModal} />
      <ForgotPasswordModal
                isOpen={isForgotPasswordOpen}
                onClose={() => setShowForgotPasswordModal(false)}
            />
    </>
  );
};

export default ServiceCard;
