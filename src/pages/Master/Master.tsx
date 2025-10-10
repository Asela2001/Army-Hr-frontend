import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const Master = () => {
  const tableNames = [
    "regiment",
    "unit",
    "rank",
    "appointment",
    "allowance",
    "loan",
    "fitness",
    "medical",
    "award",
    "mission",
    "security-clearance",
  ];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-2xl mb-4 text-center font-semibold">Master Tables</h1>
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {tableNames.map((table, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-[#7c8b24] text-white rounded hover:bg-[#6b7a1f]"
              onClick={() => navigate(`/master/${table}`)}
            >
              {table.charAt(0).toUpperCase() + table.slice(1)}
            </button>
          ))}
        </div>
        
      </div>
    </div>
  );
}

export default Master
