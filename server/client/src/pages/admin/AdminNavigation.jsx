import React from "react";
import AdminImg from "../../assets/hero-carousel/admin.png";
import { NavLink } from "react-router-dom";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";

const AdminNavigation = () => {
  const [logoutUser] = useLogoutUserMutation();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-5 bg-white p-8 md:h-[calc(100vh-98px)] flex flex-col justify-between">
      <div>
        <div className="mb-5">
          <img src={AdminImg} alt="" className="size-14" />
          <p className="font-semibold">Admin</p>
        </div>
        <hr />
        <ul className="space-y-5 pt-5">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
              to={"/dashboard"}
              end
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
              to={"/dashboard/add-new-post"}
            >
              Add New Post
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
              to={"/dashboard/manage-items"}
            >
              Manage Items
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
              to={"/dashboard/users"}
            >
              Users
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <hr />
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 font-medium mt-5 px-5 py-1 rounded-sm hover:shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavigation;
