import React, { useState } from "react";
import { useUpdateUserMutation } from "../../../redux/features/auth/authApi";
import { BsExclamationCircle } from "react-icons/bs";

const UpdateUserRoleModal = ({ user, onClose, onRoleUpdate }) => {
  const [role, setRole] = useState(user?.role);
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();

  const handleSubmit = async () => {
    try {
      await updateUser({
        id: user?._id,
        role,
      }).unwrap();
      onRoleUpdate();
      onClose();
      alert("User role updated!");
    } catch (error) {
      console.log("Failed to update user role", error);
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm">
        <BsExclamationCircle className="mx-auto size-12 mb-5" />
        <div className="flex flex-col text-center mb-5">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Are you sure you want to delete this user?
          </h2>
          <span className="mx-auto text-lg italic text-red-600">
            {user?.email}
          </span>
        </div>
        <select
          className="block w-full p-2 border border-gray-300 rounded-md mb-4"
          value={role}
          onChange={handleRoleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Update Role
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserRoleModal;
