export type Profile = {
	full_name: string;
	user: {
		email: string;
		username: string;
		first_name: string;
		last_name: string;
		is_superuser: boolean;
	};
	bio: string;
	avatar: string;
};

export type ErrorsType = {
	username?: string;
	email?: string;
	password?: string;
	passwordConfirm?: string;
};

export interface EditProfileModalProps {
	isOpen: boolean;
	onClose: () => void;
	profile: {
		user: {
			username: string;
			first_name: string;
			last_name: string;
		}
		bio: string;
		avatar: string;
	};
	onSave: (formData: {
		user: {
			email: string;
			username: string;
			first_name: string;
			last_name: string;
			is_superuser: boolean;
		};
		bio: string;
		avatar: string;
	}) => void;
}
