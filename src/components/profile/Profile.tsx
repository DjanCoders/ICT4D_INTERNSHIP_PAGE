import { useState, useEffect } from "react";
import EditProfileModal from "./EditProfileModal";
import { Profile } from "../../types";
import { getProfile, updateProfile } from "../../api";

const UserProfile = ({ profile }: { profile: Profile }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [profiles, setProfiles] = useState(profile);

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
			full_name: updatedProfile.user.first_name + " " + updatedProfile.user.last_name,
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
			<div className="max-w-xl border-[2px] border-gray-500 min-h-[50vh] justify-center flex flex-col mx-auto bg-white rounded-lg p-6 mt-10">
				<h2 className="text-2xl font-bold mb-4">Profile Information</h2>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Full Name
					</label>
					<p className="text-gray-900">{profiles.full_name}</p>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Username
					</label>
					<p className="text-gray-900">{profiles.user?.username}</p>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Email
					</label>
					<p className="text-gray-900">{profiles.user?.email}</p>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Bio
					</label>
					<p className="text-gray-900">{profiles.bio}</p>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Avatar
					</label>
					<div className="avatar w-44 h-44 rounded-full overflow-hidden mx-auto">
						<img
						className="w-full h-full object-cover"
							src={
								typeof profiles.avatar === "string"
									? profiles.avatar
									: "http://localhost:8000/media/default_avatar.png"
							}
							alt="profile avatar"
						/>
					</div>
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
			</div>
			<EditProfileModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				profile={
					{
						user: {
							username: profiles.user?.username || "",
							first_name: profiles.user?.first_name || "",
							last_name: profiles.user?.last_name || "",
						},
						bio: profiles.bio || "",
						avatar: profiles.avatar || "",
					}
				}
				onSave={handleSaveProfile}
			/>
		</>
	);
};

export default UserProfile;
