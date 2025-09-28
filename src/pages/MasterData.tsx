import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const MasterData = () => {
  const navigate = useNavigate();
  const { tableName } = useParams();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/master/${tableName}`
        );
        const data = await response.json();
        setTableData(data);
        console.log(`Fetched ${tableName} data:`, data);
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
        console.error(`Error fetching ${tableName} data:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchMasterData();
  }, [tableName]);
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {tableName ? (
        <div className="max-w-6xl mx-auto p-4">
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {tableData.length > 0 && (
            <div className="overflow-x-auto">
              <h2 className="text-2xl mb-4 text-center font-semibold">
                {tableName.charAt(0).toUpperCase() + tableName.slice(1)} Table
              </h2>
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    {Object.keys(tableData[0] || {}).map((key) => (
                      <th key={key} className="border p-2">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, i) => (
                        <td key={i} className="border p-2">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <button
            className="mt-4 px-4 py-2 bg-[#7c8b24] text-white rounded hover:bg-[#6b7a1f]"
            onClick={() => navigate("/master")}
          >
            Back
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Select a table from the home page to view data.
        </p>
      )}
    </div>
  );
};

export default MasterData;
