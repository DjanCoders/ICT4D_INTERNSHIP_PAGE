export type userProfile = {
  id: number;
  user: {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  };
};

export type EditProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: userProfile;
  onSave: (updatedUser: userProfile) => void;
};
