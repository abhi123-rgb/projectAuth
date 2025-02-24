import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/validation";
import axiosInstance from "../utils/axiosAPI";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [signUpRole, setSignUpRole] = useState("Manager");

  const navigate = useNavigate();

  const handleManagerSignup = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/managersignup", {
        fullName: fullName,
        email: email,
        password: password,
        role: signUpRole
      })

      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response) {
        navigate('/signin');
      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured. Please try again");
      }
    }
  }

  const handleAdminSignup = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    if (!accessCode) {
      setError("Please enter the AccessCode");
      return;
    }
    console.log(accessCode);

    setError("");

    try {
      const response = await axiosInstance.post("/adminsignup", {
        fullName: fullName,
        email: email,
        password: password,
        accessCode: accessCode,
        role: signUpRole
      })

      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response) {
        navigate('/signin');
      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured. Please try again");
      }
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 h-screen max-[800px]:grid-cols-1">
        <div className="max-[800px]:hidden">
          <img src="/img1.jpg" alt="imgAssets" className="w-full h-full object-center" />
        </div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">

            <h2 className="mt-10 mb-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              {signUpRole} Registration
            </h2>

            <div>
              <label htmlFor="role" className="block text-sm/6 font-light text-gray-900">
                Select role to signup
              </label>
              <select
                id="role"
                required
                value={signUpRole}
                onChange={(e) => setSignUpRole(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                <option value="Select your Role" hidden>Select your Role</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
            {signUpRole == "Admin" ? (
              <form className="space-y-6"
                onSubmit={handleAdminSignup}
              >
                <div>
                  <label htmlFor="fullName" className="block text-sm/6 font-light text-gray-900">
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm/6 font-light text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-light text-gray-900">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>


                <div>
                  <label htmlFor="accessCode" className="block text-sm/6 font-light text-gray-900">
                    Access Code
                  </label>
                  <div className="mt-2">
                    <input
                      id="accessCode"
                      name="accessCode"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      type="text"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                {error && <p className='text-red-500 text-xs'>{error}</p>}

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            ) : (
              <form className="space-y-6"
                onSubmit={handleManagerSignup}
              >

                <div>
                  <label htmlFor="fullName" className="block text-sm/6 font-light text-gray-900">
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm/6 font-light text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-light text-gray-900">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                {error && <p className='text-red-500 text-xs'>{error}</p>}

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            )}

            <p className="mt-5 text-center text-sm/6 text-gray-500">
              Already have Account?{' '}
              <Link to="/signin" className="font-semibold underline text-violet-600 hover:text-violet-500">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}


