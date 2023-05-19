import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pseudo === "" || password === "" || confirmPassword === "") {
      setErrorMsg("Please fill in all the fields");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    } else if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    } else if (password.length < 6) {
      setErrorMsg("At least 6 characters for password.");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    } else {
      await axios
        .post(process.env.REACT_APP_BASE_API_URL + "signup", {
          pseudo,
          password,
          confirmPassword,
        })
        .then((response) => {
          navigate("/", { state: { pseudo } });
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
            value={pseudo}
            name="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            className="bg-primary text-green
          pl-3 outline-none h-[45px] rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-y-3 mb-5">
          <label className="text-xl">Password</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-primary text-green
          pl-3 outline-none h-[45px] rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-y-3 mb-5">
          <label className="text-xl">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-primary text-green
          pl-3 outline-none h-[45px] rounded-xl"
          />
        </div>
        <button
          type="submit"
          className="bg-green text-white h-[45px]
        rounded-[5px] font-semibold mt-2 mb-5"
        >
          Sign Up
        </button>
        <div className="">
          <p className="text-center">
            Vous êtes inscrit ? <br />
            <a href="/" className="text-green">
              Connectez vous ici !
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
