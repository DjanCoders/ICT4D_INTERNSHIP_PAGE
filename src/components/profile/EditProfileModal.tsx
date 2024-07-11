import { FormEvent, useState, useEffect } from "react";
import { EditProfileModalProps } from "../../types";

const EditProfileModal = ({
  isOpen,
  onClose,
  user,
  onSave,
}: EditProfileModalProps) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        department: user.department,
      });
    }
  }, [user]);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50">
      <div className="bg-white mx-auto w-5/6 md:w-1/2 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="mx-auto">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700"
              type="text"
              name="username"
              title="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700"
              type="email"
              name="email"
              title="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="department"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Area of Department
            </label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700"
              type="text"
              name="department"
              title="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
