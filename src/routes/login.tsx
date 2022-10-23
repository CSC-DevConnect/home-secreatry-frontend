import React, { ChangeEvent, ChangeEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInAsync } from "../store/user/user-actions";
import Img from "../assets/images/login.png";
import { Link } from "react-router-dom";
import { ForgetPasswordModal } from "../components/forget-password.modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [formValues, setFormValues] = React.useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const toggleModal = () => setOpenModal(!openModal);

  const { email, password } = formValues;

  const handleChange: ChangeEventHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const r = await dispatch(signInAsync(email, password));
    console.log(r);

    // try {
    //   await dispatch(signInAsync(email, password));
    //   // toast.success("Login Successful");
    // } catch (err) {
    //   console.log("Login failed");
    //   if (err instanceof Error) {
    //     return toast.error(err.message);
    //   }
    // }
  };
  return (
    <>
      <div className="relative bg-white w-screen h-screen grid grid-cols-2">
        <div className="">
          <img
            src={Img}
            alt="Login"
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-10 flex flex-col items-center">
          <div className="px-4 sm:px-0 text-center">
            <h3 className="text-4xl font-medium leading-10 text-blue-600/100">
              Login
            </h3>
            <p className="mt-2 text-sm text-[#3177FF] text-xl">
              Hey, Enter your details to get sign in to your account
            </p>
          </div>
          <div className="mt-10">
            <form action="#" method="POST" onSubmit={handleSubmit}>
              <input
                type="text"
                name="email"
                id="email-address"
                autoComplete="email"
                placeholder="Email address or Username"
                required
                className="mt-6 py-2.5 px-4 w-full bg-[#F1F6FF] rounded-2xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="password"
                placeholder="Password"
                required
                className="mt-6 py-2.5 px-4 w-full bg-[#F1F6FF] rounded-2xl border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={handleChange}
              />
              <div className="text-right px-2">
                <span
                  className="text-sm text-[#3177FF] text-xs cursor-pointer"
                  onClick={toggleModal}
                >
                  Forget Password
                </span>
              </div>
              <div className="mt-10 flex justify-center items-center">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-2xl border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="mt-6 mb-10 flex justify-center items-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600/100 hover:text-blue-400/100"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>{" "}
        </div>
      </div>
      <ForgetPasswordModal openModal={openModal} toggleModal={toggleModal} />
      <ToastContainer />
    </>
  );
};
