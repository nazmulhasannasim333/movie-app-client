import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { loginUser, googleLogin } = useAuth();
  const [showError, setShowError] = useState("");
  let location = useLocation();
  const navigate = useNavigate();

  let from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    setShowError("");
    loginUser(data.email, data.password)
      .then((result) => {
        const loginUser = result.user;
        console.log(loginUser);
        navigate(from, { replace: true });
        toast.success('Successfully Login!')
      })
      .catch((err) => {
        console.log(err);
        setShowError(err.message);
      });
  };

  return (
    <div className="min-h-[700px] pt-[150px] pb-20 lg:px-0 px-4">
      <div className="max-w-md mx-auto bg-slate-900 shadow-xl rounded pt-10">
        <div className="text-center text-white py-4 text-md">Sign in with</div>
        <SocialLogin />
        <div className="bg-slate-900 pt-8 pb-16">
          <div className="text-center text-white mb-7 text-md">
            Or Sign in with Email &amp; Password
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-4/5 mx-auto">
              <div className="flex items-center shadow-md mb-4 border-0 border-b-2 border-b-red-500">
                <span className="px-3">
                  <svg
                    className="fill-current text-gray-200 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M18 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h16zm-4.37 9.1L20 16v-2l-5.12-3.9L20 6V4l-10 8L0 4v2l5.12 4.1L0 14v2l6.37-4.9L10 14l3.63-2.9z" />
                  </svg>
                </span>
                <input
                  className="w-full h-12 bg-slate-900 text-white focus:outline-none"
                  type="email"
                  name="email"
                  {...register("email")}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="flex items-center shadow-md mb-4 border-0 border-b-2 border-b-red-500">
                <span className="px-3">
                  <svg
                    className="fill-current text-gray-200 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 8V6a6 6 0 1 1 12 0h-3v2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                  </svg>
                </span>
                <input
                  className="w-full h-12 bg-slate-900 text-white focus:outline-none"
                  type="password"
                  name="password"
                  {...register("password")}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="mb-6">
                <input type="checkbox" name="remember" className="mr-1" />
                <label htmlFor="remember" className="text-sm text-white">
                  Remember me
                </label>
              </div>
              <button className="bg-gradient-to-r from-red-600 to-slate-950 hover:from-pink-500 hover:to-yellow-500 block mx-auto text-white text-sm uppercase rounded shadow-md px-6 py-2">
                Sign in
              </button>
            </div>
          </form>
          <p className="text-center text-red-500 pt-5">
            {showError && showError}
          </p>
          <p className="text-white text-center mt-8">
            Do not have an account ?{" "}
            <Link className="text-blue-500" to="/signup">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
