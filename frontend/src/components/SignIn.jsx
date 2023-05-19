import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import { saveData } from "../utils";

const SignIn = () => {
  const location = useLocation();
  const [username, setUsername] = useState(location.state?.pseudo || "");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setErrorMsg("Please fill in all the fields");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    } else {
      await axios
        .post(process.env.REACT_APP_BASE_API_URL + "signin", {
          pseudo: username,
          password,
        })
        .then((response) => {
          const data = response.data.data;
          const token = data.token;
          saveData("userToken", token);
          navigate("/home");
        })
        .catch(
          ({
            response: {
              data: { message },
            },
          }) => {
            setErrorMsg(message);
            setTimeout(() => {
              setErrorMsg("");
            }, 3000);
          }
        );
    }
  };

  return (
    <div
      className="flex items-center justify-center
      min-h-screen"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between bg-white
      border rounded-[5px] w-full max-w-[400px] h-full p-10 
      min-h-[380px]"
      >
        {location.state?.authError && (
          <div
            className="bg-red-100 border text-red-500 px-4 py-3 rounded relative w-full mb-1"
            role="alert"
          >
            <strong className="font-bold">Connectez-vous pour continuer</strong>
          </div>
        )}
        {errorMsg !== "" && (
          <div
            className="bg-red-100 border text-red-500 px-4 py-3 rounded relative w-full mb-1"
            role="alert"
          >
            <strong className="font-bold">{errorMsg}</strong>
          </div>
        )}
        <div className="flex flex-col gap-y-3 mb-5">
          <label className="text-xl">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-primary text-green
          pl-3 outline-none h-[45px] rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-y-3 mb-5">
          <label className="text-xl">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-primary text-green
          pl-3 outline-none h-[45px] rounded-xl"
          />
        </div>
        <button
          type="submit"
          className="bg-green text-white h-[45px]
        rounded-[5px] font-semibold mt-2 mb-5"
        >
          Sign In
        </button>
        <div className="">
          <p className="text-center">
            Vous n'êtes pas inscrit ? <br />
            <a href="/auth/sign-up" className="text-green">
              Inscrivez vous ici !
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
