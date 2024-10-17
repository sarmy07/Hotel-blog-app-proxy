import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import avatarImg from "../assets/hero-carousel/commentor.png";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const toogleMenu = () => setIsMenuOpen(!isMenuOpen);

  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navLists = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-white py-6 border">
      <nav className="container mx-auto flex justify-between px-5">
        <a href="/ ">
          <img src="/logo.png" className="h-12" alt="" />
        </a>

        <ul className="sm:flex hidden items-center gap-8">
          {navLists.map((list, index) => (
            <li key={index}>
              <NavLink
                to={`${list.path}`}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {list.name}
              </NavLink>
            </li>
          ))}

          {
            user && user.role === "user" ? (
              <li className="flex items-center gap-2">
                <img src={avatarImg} alt="" className="size-8" />
                <button
                  onClick={handleLogout}
                  className="bg-[#1e73be] px-4 py-1.5 text-white rounded-sm"
                >
                  Logout
                </button>
              </li>
            ) : null
            // <li>
            //   <NavLink to={"/login"}>Login</NavLink>
            // </li>
          }

          {user && user.role === "admin" && (
            <li className="flex items-center gap-3">
              <img src={avatarImg} alt="" className="size-8" />
              <Link to={"/dashboard"}>
                <button className="bg-[#1e73be] px-4 py-1.5 text-white rounded-sm">
                  Dashboard
                </button>
              </Link>
            </li>
          )}

          {!user && (
            <li>
              <NavLink to={"/login"}>Login</NavLink>
            </li>
          )}
        </ul>

        {/* toogle menu */}
        <div className="flex items-center sm:hidden">
          <button
            onClick={toogleMenu}
            className="flex items-center px-3 py-4 bg-[#fafafa] rounded text-sm text-gray-500 hover:text-gray-900"
          >
            {isMenuOpen ? (
              <IoCloseSharp className="size-6" />
            ) : (
              <IoIosMenu className="size-6" />
            )}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      {isMenuOpen && (
        <ul className="fixed top-[85px] left-0 w-full h-auto pb-8 border-b bg-white shadow-sm z-50">
          {navLists.map((list, index) => (
            <li key={index} className="mt-5 px-4">
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                to={`${list.path}`}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {list.name}
              </NavLink>
            </li>
          ))}

          {user && user.role === "admin" && (
            <li className="flex items-start px-4 mt-3 gap-3">
              <img src={avatarImg} alt="" className="size-8" />
              <Link
              onClick={() => setIsMenuOpen(false)}
              to={"/dashboard"}>
                <button className="bg-[#1e73be] px-4 py-1.5 text-white rounded-sm">
                  Dashboard
                </button>
              </Link>
            </li>
          )}

          {
            user && user.role === "user" ? (
              <li className="flex mt-3 items-start gap-3 px-4">
                <img src={avatarImg} alt="" className="size-8" />
                <button
                  onClick={handleLogout}
                  className="bg-[#1e73be] px-4 py-1.5 text-white rounded-sm"
                >
                  Logout
                </button>
              </li>
            ) : null
            // <li>
            //   <NavLink to={"/login"}>Login</NavLink>
            // </li>
          }

          {!user && (
            // <li>
            //   <NavLink to={"/login"}>Login</NavLink>
            // </li>

            <li className="px-4 mt-5">
              <NavLink onClick={() => setIsMenuOpen(false)} to={"/login"}>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      )}
    </header>
  );
};

export default Nav;
