import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import { Profile } from "../../types";
import { getProfile, updateProfile } from "../../api";

const UserProfile = ({ profile }: { profile: Profile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profiles, setProfiles] = useState(profile);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token"); // or however you check authentication
    if (!token) {
      // If not authenticated, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  const fetchProfile = async () => {
    const prof = await getProfile();
    setProfiles(prof.data[0]);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProfile = async (updatedProfile: {
    user: {
      username: string;
      first_name: string;
      last_name: string;
    };
    bio: string;
    avatar: File;
  }) => {
    await updateProfile({
      id: profiles.id,
      full_name: `${updatedProfile.user.first_name} ${updatedProfile.user.last_name}`,
      is_internee: profiles.is_internee, // ✅ add this

      user: {
        id: profiles.user.id,
        email: profiles.user.email,
        username: updatedProfile.user.username,
        first_name: updatedProfile.user.first_name,
        last_name: updatedProfile.user.last_name,
        is_superuser: profiles.user.is_superuser,
      },
      bio: updatedProfile.bio,
      avatar: updatedProfile.avatar,
    });

    await fetchProfile();
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-10">
        <h2 className="text-3xl font-bold text-center mb-6">
          Profile Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center p-4 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold">Personal Information</h3>
            <div className="mb-4">
              <img
                className="w-32 h-32 object-cover rounded-full border-4 border-blue-500"
                src={
                  typeof profiles.avatar === "string"
                    ? profiles.avatar
                    : "https://ict4d-internship-api.onrender.com/media/default_avatar.png"
                }
                alt="Profile Avatar"
              />
            </div>
            <p className="text-lg">{profiles.full_name}</p>
            <p className="text-gray-600">{profiles.user?.username}</p>
          </div>
          <div className="flex flex-col p-4 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold">Contact Information</h3>
            <div className="mb-2">
              <label className="block text-gray-700">Email:</label>
              <p className="text-gray-900">{profiles.user?.email}</p>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Bio:</label>
              <p className="text-gray-900">{profiles.bio}</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            type="button"
            onClick={handleEditClick}
          >
            Edit Profile
          </button>
        </div>
      </div>
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        profile={{
          user: {
            username: profiles.user?.username || "",
            first_name: profiles.user?.first_name || "",
            last_name: profiles.user?.last_name || "",
          },
          bio: profiles.bio || "",
          avatar: profiles.avatar || "",
        }}
        onSave={handleSaveProfile}
      />
    </>
  );
};

export default UserProfile;
