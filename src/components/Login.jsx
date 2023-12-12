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
  const [loading, setLoading] = useState(false);

  const backgroundStyle = {
    backgroundImage: `url('https://media.istockphoto.com/id/1198931639/photo/writing-a-blog-blogger-influencer-reading-text-on-screen.jpg?s=612x612&w=0&k=20&c=4FJ_fzzZYqBoGG-RY8fcohpaOKKwnnI-ik58cPy6t-g=')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
  };

  const signupUser = async () => {
    try {
      setLoading(true);
      let response = await API.userSignup({
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
      });
      if (response.isSuccess) {
        setIsLogin(true);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      setIsError("Something went wrong, try Again later");
    }
  };

  const loginUser = async () => {
    try {
      setLoading(true);
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
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      setIsError("Something went wrong, try Again later");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  // if (loading) return (
  //   <div className="flex items-center justify-center h-screen">
  //     <div className="relative">
  //       <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
  //       <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
  //     </div>
  //   </div>
  // );

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
              {loading && (
                <svg
                  ariaHidden="true"
                  role="status"
                  className="inline w-7 h-7 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              {!loading && <p>Sign In</p>}
            </button>
          </div>
        </div>

        <p className=" text-center text-sm text-gray-900">
          Test Email: test@test.com Test Password: 123456
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
              {loading && (
                <svg
                  ariaHidden="true"
                  role="status"
                  className="inline w-7 h-7 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              {!loading && <p>Sign Up</p>}
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
