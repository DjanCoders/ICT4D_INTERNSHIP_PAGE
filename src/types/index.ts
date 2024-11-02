export type Profile = {
	user: {
		email: string;
		username: string;
		is_superuser: boolean;
	};
	avatar: string;
};

export type ErrorsType = {
	username?: string;
	email?: string;
	password?: string;
	passwordConfirm?: string;
};
