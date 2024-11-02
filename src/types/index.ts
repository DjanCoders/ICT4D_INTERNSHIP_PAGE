export type Profile = {
	user: {
		email: string;
		username: string;
		is_superuser: boolean;
	};
	avatar: string;
};

// export type EditProfileModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   Profile: Profile;
//   onSave: (updatedUser: Profile) => void;
// };
