import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { User } from "../../types";

const Profile = ({ user }: { user: User }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState(user);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProfile = (updatedProfile: User) => {
    setProfile(updatedProfile);
  };

  return (
    <div className="max-w-4xl min-h-[85vh] mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Username
        </label>
        <p className="text-gray-900">{profile.username}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <p className="text-gray-900">{profile.email}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Area of Department
        </label>
        <p className="text-gray-900">{profile.department}</p>
      </div>
      <div>
        <button
          className="border-2 px-5 py-2 rounded-xl"
          type="button"
          onClick={handleEditClick}
        >
          Edit Profile
        </button>
      </div>
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={profile}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default Profile;
