export type User = {
  username: string;
  email: string;
  department: string;
};

export type EditProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSave: (updatedUser: User) => void;
};
