import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-full bg-gray-200 h-screen flex justify-center items-center">
      <div className="w-4/12 p-4 rounded-xl bg-white shadow-lg">
        <h1 className="text-center text-2xl text-gray-800 font-bold">
          Login to Account
        </h1>
        <div className="flex flex-col">
          <label htmlFor="email" className="my-2 text-gray-600">
            Email
          </label>
          <input
            id="email"
            type="text"
            className="p-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:rounded-xl"
            placeholder="Enter your email"
          />
          <span id="emailDescription" className="sr-only">
            Please enter your email address.
          </span>
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="my-2 text-gray-600">
            Password
          </label>
          <input
            id="password"
            type="text"
            className="p-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:rounded-xl"
            placeholder="Enter your password"
          />
          <span id="password" className="sr-only">
            Please enter your password.
          </span>
        </div>
        <button className="my-4 bg-blue-500 rounded-xl w-full text-white p-2 text-center">
          Log in
        </button>
        <Link to="/signup">
          <p className="text-center text-gray-500">Create new account</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
