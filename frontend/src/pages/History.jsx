/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { NavBar, DisplayHistory } from "../components";
import { getData, removeData } from "../utils";
import axios from "axios";

const History = () => {
  const [histories, setHistories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const token = getData("userToken");

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    await axios
      .get(process.env.REACT_APP_BASE_API_URL + "history", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(
        ({
          data: {
            data: { queries },
          },
        }) => {
          const result = queries || [];
          setHistories(result);
          const again = result.every((e) => {
            return e.etat !== "Pending";
          });
          if (result.length && !again) {
            setTimeout(getHistory, 5000);
          }

          setIsLoading(false);
        }
      )
      .catch((error) => {
        removeData("userToken");
        navigate("/", { state: { authError: true } });
      });
  };

  return (
    <>
      <NavBar />
      <div
        className="flex items-center justify-center
        min-h-[80vh]"
      >
        <div
          className="bg-white w-auto h-auto lg:min-w-[500px]
          flex flex-col rounded-[5px] px-2 max-lg:w-auto"
        >
          <h2 className="text-center mt-3">Historique</h2>
          {isLoading ? (
            <div
              className="flex w-full bg-primary text-green
            mt-4 py-2 mb-4 justify-center text-center"
            >
              Chargement...
            </div>
          ) : (
            <div
              className="flex flex-col w-full bg-primary overflow-y-scroll
              h-[300px] mt-3 mx-auto mb-3 text-green p-6 scrollbar-hide"
            >
              {histories.map((historique) => (
                <DisplayHistory
                  key={historique._id}
                  request={historique.commande}
                  status={historique.etat}
                  id={historique._id}
                />
              ))}
              {histories.length === 0 && (
                <div
                  className="flex w-full bg-primary text-green
            mt-4 py-2 mb-4 justify-center text-center"
                >
                  Pas de requêtes...
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default History;
