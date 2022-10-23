import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOutAsync } from "../store/user/user-actions";
import { selectCurrentUser } from "../store/user/user-select";

export const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => setShowNav(!showNav);

  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  const signOutUser = () => dispatch(signOutAsync());

  return (
    <nav>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-10">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-[#3177FF] hover:text-white hover:bg-[#D8E5FF] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleNav}
            >
              {showNav ? <IoClose /> : <GiHamburgerMenu />}
            </button>
          </div>
          <div className="flex flex-1 items-center  h sm:justify-start">
            <div className="hidden sm:ml-4 sm:block">
              <div className="flex space-x-4 sm:space-x-2">
                <Link
                  to="/"
                  className="text-[#3177FF] px-5 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >
                  Home
                </Link>

                <Link
                  to="/calender"
                  className="text-[#3177FF] px-5 py-2 rounded-md text-sm font-medium"
                >
                  Calender
                </Link>
                <Link
                  to="profile"
                  className="text-[#3177FF] px-5 py-2 rounded-md text-sm font-medium"
                >
                  Profile
                </Link>
                <Link
                  to="about"
                  className="text-[#3177FF] px-5 py-2 rounded-md text-sm font-medium"
                >
                  About us
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-center sm:justify-end">
            <div className="hidden sm:ml-4 sm:block">
              <div className="flex space-x-4 sm:space-x-2">
                {currentUser ? (
                  <Link
                    onClick={signOutUser}
                    className="text-[#3177FF] px-5 py-2 rounded-md text-sm font-medium"
                    aria-current="page"
                    to={""}
                  >
                    Logout
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="text-[#3177FF] px-5 py-2 rounded-md text-sm font-medium"
                    aria-current="page"
                  >
                    Login
                  </Link>
                )}

                <Link
                  to="/register"
                  className="text-white bg-blue-600 px-5 py-2 rounded-full text-sm font-medium"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={showNav ? "sm:hidden" : "hidden"}>
          <div className="space-y-1 px-2 pt-2 pb-3">
            <Link
              to="/"
              className="bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium"
              aria-current="page"
            >
              Home
            </Link>

            <Link
              to="/calender"
              className="text-[#3177FF] hover:bg-[#D8E5FF] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Calender
            </Link>
            <Link
              to="/profile"
              className="text-[#3177FF] hover:bg-[#D8E5FF] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Profile
            </Link>

            <Link
              to="/about"
              className="text-[#3177FF] hover:bg-[#D8E5FF] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
