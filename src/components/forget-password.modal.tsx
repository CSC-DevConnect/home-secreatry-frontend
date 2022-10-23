import React, { ChangeEvent, ChangeEventHandler } from "react";
import { CgKeyhole } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { forgotPasswordAsync } from "../store/user/user-actions";

export const ForgetPasswordModal = ({ openModal, toggleModal }: any) => {
  const [emailValue, setEmailValue] = React.useState({ email: "" });
  const dispatch = useDispatch();

  const handleChange: ChangeEventHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setEmailValue({ ...emailValue, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(forgotPasswordAsync(emailValue.email));
      setEmailValue({ email: "" });
      toggleModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={
        "w-full h-full min-h-full fixed top-0 left-0 items-center justify-center bg-sky-500/[.5] " +
        (openModal ? "flex" : "hidden")
      }
    >
      <div className="w-1/4 sm:w-80 bg-white rounded-xl shadow-xl p-6 text-center z-50">
        <div className="inset-0 transition-opacity" aria-hidden="true">
          <i className="text-3xl flex justify-center text-[#3177FF]">
            <CgKeyhole />
          </i>
          <h3 className="text-2xl leading-8 font-bold mb-4">
            Forget Password?
          </h3>
          <p className="text-sm">
            No worries, we'll send you reset instructions
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            id="email"
            autoComplete="email"
            placeholder="Enter your email address"
            required
            className="mt-6 py-2.5 px-4 w-full bg-[#F1F6FF] rounded-2xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={handleChange}
          />
          <div className="mt-10 flex justify-center items-center">
            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-2xl border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none"
            >
              Reset Password
            </button>
          </div>
          <div className="mt-3">
            <span
              className="text-[ #494949] cursor-pointer"
              onClick={toggleModal}
            >
              &larr; Back to login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
