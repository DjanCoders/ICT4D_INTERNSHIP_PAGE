import { useState, useEffect } from "react";
import EditProfileModal from "./EditProfileModal";
import { userProfile } from "../../types";
import { getProfile } from "../../api";

const Profile = ({ user }: { user: userProfile }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [profile, setProfile] = useState(user);

	useEffect(() => {
		const fetchProfiles = async () => {
			const response = await getProfile();
			setProfile(response.data[0])
		}

		fetchProfiles();
	}, [])

	const handleEditClick = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleSaveProfile = (updatedProfile: userProfile) => {
		setProfile(updatedProfile);
	};

	return (
		<div className="max-w-4xl min-h-[100vh] justify-center flex flex-col mx-auto bg-white rounded-lg p-6 mt-10">
			<h2 className="text-2xl font-bold mb-4">Profile Information</h2>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2">
					{profile.user?.username}
				</label>
				<p className="text-gray-900">{}</p>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2">
					{profile.user?.email}
				</label>
				<p className="text-gray-900">{}</p>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2">
					{profile.user?.first_name} {profile.user?.last_name}
				</label>
				<p className="text-gray-900">{}</p>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2">
				</label>
				<p className="text-gray-900">{}</p>
				<img src={profile.avatar}></img>
			</div>
			<div>
				<button
					className="border-2 hover:bg-transparent hover:border-slate-400 hover:border-[2px] px-5 py-2 rounded-xl transition-all duration-300"
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
