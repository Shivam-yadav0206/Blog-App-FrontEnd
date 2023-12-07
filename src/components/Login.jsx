import React, { useState, useRef, useContext } from "react";
import { API } from "../service/api";
import { DataContext } from "../context/DataProvider";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const name = useRef("");
  const email = useRef("");
  const password = useRef("");
  const loginEmail = useRef("");
  const loginPassword = useRef("");

  const navigate = useNavigate();
  const [error, setIsError] = useState("");
  const { setAccount } = useContext(DataContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const backgroundStyle = {
    backgroundImage: `url('https://media.istockphoto.com/id/1198931639/photo/writing-a-blog-blogger-influencer-reading-text-on-screen.jpg?s=612x612&w=0&k=20&c=4FJ_fzzZYqBoGG-RY8fcohpaOKKwnnI-ik58cPy6t-g=')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
  };

  const signupUser = async () => {
    try {
      let response = await API.userSignup({
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
      });
      if (response.isSuccess) {
        setIsLogin(true);
      }
    } catch (error) {
      console.log(error.message);
      setIsError("Something went wrong, try Again later");
    }
  };

  const loginUser = async () => {
    try {
      let response = await API.userLogin({
        email: loginEmail.current.value,
        password: loginPassword.current.value,
      });
      if (response.isSuccess) {
        setIsError("");
        sessionStorage.setItem(
          `accessToken`,
          `Bearer ${response.data.accessToken}`
        );
        sessionStorage.setItem(
          `refreshToken`,
          `Bearer ${response.data.refreshToken}`
        );
        setAccount({ email: response.data.email, name: response.data.name });
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      setIsError("Something went wrong, try Again later");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return isLogin ? (
    <div
      style={backgroundStyle}
      className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign In
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white">
              Email address
            </label>
            <div className="mt-2">
              <input
                ref={loginEmail}
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white">
                Password
              </label>
              <div className="text-sm">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </button>
              </div>
            </div>
            <div className="mt-2">
              <input
                ref={loginPassword}
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            {error && (
              <h6 className="block text-sm font-medium leading-6 text-red-600">
                {error}
              </h6>
            )}
            <button
              onClick={() => loginUser()}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign in
            </button>
          </div>
        </div>

        <p className=" text-center text-sm text-gray-900">
          Test Email: test@test.com
          Test Password: 123456 
        </p>

        <p className="mt-5 text-center text-sm text-gray-900">
          Not a member?
          <button
            onClick={() => setIsLogin(false)}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            SignUp
          </button>
        </p>
      </div>
    </div>
  ) : (
    <div
      style={backgroundStyle}
      className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign Up
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-white">
              Name
            </label>
            <div className="mt-2">
              <input
                ref={name}
                name="name"
                type="name"
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white">
              Email address
            </label>
            <div className="mt-2">
              <input
                ref={email}
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white">
                Password
              </label>
              <div className="text-sm">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="font-semibold text-indigo-600 hover:text-indigo-500">
                  {isPasswordVisible ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="mt-2">
              <input
                ref={password}
                id="password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            {error && (
              <h6 className="block text-sm font-medium leading-6 text-red-600">
                {error}
              </h6>
            )}
            <button
              onClick={() => signupUser()}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign Up
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-900">
          Already a member?
          <button
            onClick={() => setIsLogin(true)}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            SignIn
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
