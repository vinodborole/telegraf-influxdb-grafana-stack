import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [createdSuccessfully, setCreatedSuccessfully] = useState(false);

  const handleSubmit = (event) => {

    setIsLoading(true);
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_GOCLOAK_URL}${process.env.REACT_APP_GOCLOAK_CREATEUSER_PATH}${process.env.REACT_APP_GOCLOAK_REALM}`, {
      "user":{
        username,
        firstName,
        lastName,
        email,
        enabled

      },password
      })
      .then((response) => {
        setCreatedSuccessfully(true);
        setIsLoading(false);
        console.log("User created successfully");
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        console.log(`${process.env.REACT_APP_GOCLOAK_URL}${process.env.REACT_APP_GOCLOAK_CREATEUSER_PATH}${process.env.REACT_APP_GOCLOAK_REALM}`)
      });
  };

  return (
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0  bg-gray-50 dark:bg-simnovous-teal">
      <div class="w-full bg-gray-100 rounded-lg border-gray-100 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-simnovous-dark-teal dark:border-gray-700 shadow-xl">
        {createdSuccessfully ? (
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Registered successfully</h1>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Click here to{" "}
              <Link
                to="/login"
                class="font-medium text-simnovous-orange hover:underline dark:text-simnovous-orange"
              >
                Login
              </Link>
            </p>
          </div>
        ) : (
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              onSubmit={handleSubmit}
              class="space-y-4 md:space-y-6"
              action="#"
            >
              <input
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                name="username"
                placeholder="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />

              <input
                value={firstName}
                onChange={(event) => {
                  setFirstname(event.target.value);
                }}
                type="text"
                name="first name"
                placeholder="first name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />

              <input
                value={lastName}
                onChange={(event) => {
                  setLastname(event.target.value);
                }}
                type="text"
                name="last name"
                placeholder="last name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />

              <input
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="email"
                required=""
              />

              <input
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                type="password"
                name="password"
                id="password"
                placeholder="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />

              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-simnovous-dark-teal"
                    required=""
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label
                    for="terms"
                    class="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-simnovous-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isLoading ? "Creating..." : "Create an account"}
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  class="font-medium text-simnovous-orange hover:underline dark:text-simnovous-orange"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
