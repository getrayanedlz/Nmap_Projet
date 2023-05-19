import React from "react";

import { useNavigate } from "react-router-dom";

const DisplayHistory = ({ request, status, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/query/${id}`)}
      className="flex gap-x-8 cursor-pointer
     border-b-green pb-3 hover:border-b mb-3
      justify-between"
    >
      <div className="flex gap-x-2">
        <h2 className="max-lg:hidden">Commande : </h2>
        <p>{request}</p>
      </div>
      <span
        className={`inline-flex items-center px-2 py-1 text-xs font-medium
      rounded-md w-[60px] justify-center ring-1 ring-inset
      ${
        status === "Success"
          ? "bg-green-50 text-green-700 ring-green-600/20"
          : ""
      }  
      ${status === "Error" ? "bg-red-50 text-red-700 ring-red-600/20" : ""}  
      ${
        status === "Pending"
          ? "bg-yellow-50 text-yellow-800 ring-yellow-600/20"
          : ""
      }  
      `}
      >
        {status}
      </span>
    </div>
  );
};

export default DisplayHistory;
