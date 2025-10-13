"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Banner() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-[#1A7EBD] md:h-[500px]">
      {/* Left: Banner Text */}
      <div className="w-full md:w-1/2 flex flex-col justify-start px-10 md:px-30 py-12  text-white">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to <span className="text-yellow-300">Narayana Job Portal</span>
        </h1>
        <p className="text-lg text-gray-200">
          Find your dream job and take the next step in your career journey. <br /> 
          Register or login to get started today!
        </p>
      </div>

      {/* Right: Form Card */}
      <div className="w-full md:w-1/2 flex justify-center items-center py-10">
        <div className="bg-white shadow-lg rounded-sm p-8 w-[90%] max-w-md h-[400px]">
          {/* Toggle Header */}
          <div className="flex justify-center mb-6 border-b border-gray-300">
            <button
              className={`w-1/2 py-2 font-semibold ${
                isLogin ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`w-1/2 py-2 font-semibold ${
                !isLogin ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          {/* Form Component */}
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </section>
  );
}
