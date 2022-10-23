import React, { ChangeEvent, ChangeEventHandler } from "react";
import { useDispatch } from "react-redux";
import { signUpAsync } from "../store/user/user-actions";
import Img from "../assets/images/register.png";
import { Link } from "react-router-dom";

export const Register = () => {
  const [formValues, setFormValues] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [checkItems, setCheckItems] = React.useState<any>([]);

  const dispatch = useDispatch();

  const { firstName, lastName, email, password } = formValues;

  const handleChange: ChangeEventHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    setCheckItems((prev: any) => ({
      ...prev,
      [item]: isChecked,
    }));
  };

  const isChecked =
    Object.values(checkItems).includes(false) ||
    checkItems.length === 0 ||
    Object.values(checkItems).length < 2;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(signUpAsync(firstName, lastName, email, password));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative bg-white w-screen h-screen grid grid-cols-2">
      <div className="mt-10 flex flex-col items-center px-24 md:px-12 sm:px-6">
        <div className="px-4 sm:px-0 text-center">
          <h3 className="text-4xl font-medium leading-10 text-black">
            Get Started
          </h3>
        </div>
        <div className="mt-10">
          <form action="#" method="POST" onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              id="first-name"
              autoComplete="firstName"
              placeholder="First Name"
              required
              className="mt-6 py-2.5 px-4 w-full bg-[#F1F6FF] rounded-2xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              id="last-name"
              autoComplete="lastName"
              placeholder="Last Name"
              required
              className="mt-6 py-2.5 px-4 w-full bg-[#F1F6FF] rounded-2xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={handleChange}
            />
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
            <div className="form-check m-2">
              <input
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value=""
                name="terms"
                onChange={handleCheckboxChange}
              />
              <label
                className="form-check-label inline-block text-gray-800"
                htmlFor="flexCheckDefault"
              >
                I agree to the Terms and Privacy Policy
              </label>
            </div>
            <div className="form-check m-2">
              <input
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value=""
                name="newsletter"
                onChange={handleCheckboxChange}
              />
              <label
                className="form-check-label inline-block text-gray-800"
                htmlFor="flexCheckChecked"
              >
                I agree to receive periodic product updates, offers, and
                promotions
              </label>
            </div>
            <div className="mt-10 flex justify-center items-center">
              <button
                type="submit"
                className={
                  "inline-flex w-full justify-center rounded-2xl border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none" +
                  (isChecked ? " opacity-50 cursor-not-allowed" : "")
                }
                disabled={isChecked}
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-6 mb-10 flex justify-center items-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600/100 hover:text-blue-400/100"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>{" "}
      </div>
      <div className="h-auto">
        <img
          src={Img}
          alt="register"
          className="h-full w-full object-cover lg:h-full lg:w-full"
        />
      </div>
    </div>
  );
};
