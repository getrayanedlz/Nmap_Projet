/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { NavBar } from "../components";
import { useParams, useNavigate } from "react-router-dom";
import { getData, removeData } from "../utils";
import axios from "axios";

const ViewQuery = () => {
  let { id } = useParams();

  const [query, setQuery] = useState();

  const navigate = useNavigate();
  const token = getData("userToken");

  useEffect(() => {
    getQuery();
  }, []);

  const getQuery = async () => {
    await axios
      .get(process.env.REACT_APP_BASE_API_URL + `query/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(
        ({
          data: {
            data: { query },
          },
        }) => {
          setQuery(query || []);
        }
      )
      .catch((error) => {
        console.log(error);
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
          className="bg-white w-full max-w-[600px] h-auto
          flex flex-col rounded-[5px] mx-1"
        >
          <h2 className="text-center mt-3">Détails de la commande</h2>
          <div
            className="flex flex-col w-full max-w-[570px] bg-white overflow-y-scroll
            h-auto mt-3 mx-auto mb-3  p-6 scrollbar-hide"
          >
            <form>
              <h2>Commande</h2>
              <input
                value={query?.commande || ""}
                readOnly
                className="bg-primary text-green w-full min-h-[55px]
                  mb-3 pl-3"
              />
              <h2 className="mb-2">Sortie de la commande</h2>
              <textarea
                value={query?.sortie}
                readOnly
                className="bg-primary text-green w-full min-h-[200px]
                pl-3 pt-2"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewQuery;
