import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getData, removeData } from "../utils";

import { NavBar } from "../components";

const Home = () => {
  const [command, setCommand] = useState("");

  const [select, setSelect] = useState("-sV");
  const [host, setHost] = useState("");
  const [success, setSuccess] = useState(false);
  const [port, setPort] = useState("");
  const [timeout, setTimeOut] = useState("");
  const [retries, setRetries] = useState("");

  const navigate = useNavigate();
  const token = getData("userToken");

  useEffect(() => {
    handleUpdate();
  });

  const handleUpdate = () => {
    let request = ` ${select}`;
    if (port !== "") {
      request += ` -p ${port}`;
    }
    if (retries !== "") {
      request += ` --max-retries ${retries}`;
    }
    if (timeout !== "") {
      request += ` --host-timeout ${timeout}ms`;
    }
    request += ` ${host}`;
    setCommand(request);
  };

  const handleSubmit = async (e) => {
    if (command === "") {
      alert("Please fill the field");
    } else {
      e.preventDefault();
      await axios
        .post(
          process.env.REACT_APP_BASE_API_URL + "query",
          {
            query: `nmap ` + command,
            options: command.split(" "),
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        )
        .then((response) => {
          setCommand("");
          setSelect("");
          setHost("");
          setPort("");
          setTimeOut("");
          setRetries("");
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
          removeData("userToken");
          navigate("/", { state: { authError: true } });
        });
    }
  };

  return (
    <>
      <NavBar />
      <div
        className="flex items-center justify-center
        min-h-[90vh]"
      >
        <div
          className="bg-white w-full max-w-[500px] h-auto
          flex flex-col rounded-[5px] mx-2"
        >
          <h2 className="text-center mt-6">Entrez votre comande :</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col mt-8 justify-between
            items-center mx-2"
          >
            <div className="flex flex-col w-full max-w-[400px] mb-3 gap-y-2">
              <label className="">Scan Type</label>
              <select
                value={select}
                onChange={(e) => setSelect(e.target.value)}
                className="bg-primary mx-auto text-green
                 outline-none rounded-[5px] h-[45px] w-full px-2"
              >
                <option>-sV</option>
                <option>-sS</option>
              </select>
            </div>
            <div className="flex flex-col w-full max-w-[400px] mb-3 gap-y-2">
              <label className="">Host</label>
              <input
                value={host}
                onChange={(e) => setHost(e.target.value)}
                type="text"
                placeholder="127.0.0.1"
                className="bg-primary mx-auto text-green pl-3
                    outline-none rounded-[5px] h-[45px] w-full"
              />
            </div>
            <div className="flex flex-col w-full max-w-[400px] mb-3 gap-y-2">
              <label className="">Port</label>
              <input
                value={port}
                placeholder="80"
                onChange={(e) => setPort(e.target.value)}
                type="text"
                className="bg-primary mx-auto text-green pl-3
                    outline-none rounded-[5px] h-[45px] w-full"
              />
            </div>
            <div className="flex flex-col w-full max-w-[400px] mb-3 gap-y-2">
              <label className="">Host Timeout (en ms)</label>
              <input
                placeholder="1000"
                value={timeout}
                onChange={(e) => setTimeOut(e.target.value)}
                type="text"
                className="bg-primary mx-auto text-green pl-3
                    outline-none rounded-[5px] h-[45px] w-full"
              />
            </div>
            <div className="flex flex-col w-full max-w-[400px] mb-3 gap-y-2">
              <label className="">Max retries</label>
              <input
                placeholder="3"
                value={retries}
                onChange={(e) => setRetries(e.target.value)}
                type="text"
                className="bg-primary mx-auto text-green pl-3
                    outline-none rounded-[5px] h-[45px] w-full"
              />
            </div>
            <div className="flex flex-col w-full max-w-[400px] mb-3 gap-y-2">
              <label className="">Command Preview</label>
              <input
                type="text"
                value={`nmap ` + command}
                readOnly
                className="bg-primary text-green/60
                px-2 outline-none rounded-[5px] h-[45px]
                w-full mb-8"
              />
            </div>
            {success && (
              <div
                className="bg-green/20 border text-green-700 px-4 py-3 rounded relative w-[85%] mb-1"
                role="alert"
              >
                <strong className="font-bold">Effectué</strong>
              </div>
            )}
            <button
              type="submit"
              className="bg-green text-white h-[45px] mb-8
              w-full max-w-[300px] rounded-[5px] font-semibold"
            >
              Scanner
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
