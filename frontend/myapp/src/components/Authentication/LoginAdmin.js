import React from "react";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"
import { componentActions } from "../store/store";
import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Loading from "../../logo/Loading/Loading";

function LoginAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_GOCLOAK_URL}${process.env.REACT_APP_GOCLOAK_LOGIN_ADMIN_PATH}`,
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        setIsLoading(false);
        dispatch(componentActions.setlogin(true));
        navigate("/Homepage");
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
        toast.error("Invalid credentials!", { duration: 3000 });
      });
  };

  return (
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-gray-200 dark:bg-simnovous-teal z-10">
      <div class="w-full bg-gray-100 rounded-lg border-black md:mt-0 sm:max-w-md xl:p-0 dark:bg-simnovous-dark-teal dark:border-gray-700 shadow-2xl">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Login
          </h1>
          <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <input
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="username"
              required=""
            />
            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />

            <button
              type="submit"
              disabled={isLoading}
              class="w-full text-white bg-simnovous-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center items-center"
            >
              {isLoading ? <Loading /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;
