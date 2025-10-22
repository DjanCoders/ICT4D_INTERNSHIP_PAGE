

export type Profile = {
	id: number;
	full_name: string;
	is_internee:boolean,
	user: {
		id: number;
		email: string;
		username: string;
		first_name: string;
		last_name: string;
		is_superuser: boolean;
	};
	bio: string;
	avatar: File;
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
		avatar: File;
	};
	onSave: (formData: {
		user: {
			username: string;
			first_name: string;
			last_name: string;
		};
		bio: string;
		avatar: File;
	}) => void;
}
