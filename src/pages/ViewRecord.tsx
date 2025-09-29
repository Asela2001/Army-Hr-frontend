import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';

const ViewRecord = () => {
  const navigate = useNavigate();
  const { tableName, id } = useParams();
  const [recordData, setRecordData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecordData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/master/${tableName}/${id}`
        );
        const data = await response.json();
        setRecordData(data);
        console.log(
          `Fetched record data for ${tableName} with id ${id}:`,
          data
        );
      } catch (error) {
        setError("Failed to fetch record data. Please try again later.");
        console.error(`Error fetching record data:`, error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchRecordData(); // Only fetch if id is valid
  }, [tableName, id]);

  const handleEdit = () => {
    navigate(`/master/${tableName}/edit/${id}`);
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete this ${tableName} record with ID ${id}?`
      )
    ) {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/master/${tableName}/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete record");
        navigate(`/master/${tableName}`);
      } catch (error) {
        setError("Failed to delete record. Please try again.");
        console.error(`Error deleting record:`, error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h2 className="text-2xl mb-4 text-center font-semibold">
        View {tableName.charAt(0).toUpperCase() + tableName.slice(1)} Record
      </h2>
      <div className="max-w-2xl mx-auto p-4 bg-white border rounded shadow">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {Object.keys(recordData).length > 0 && (
          <div className="space-y-4">
            {Object.entries(recordData).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <strong className="capitalize">{key}</strong>
                <span>{value}</span>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 flex justify-between">
          <button
            className="px-4 py-2 bg-[#7c8b24] text-white rounded hover:bg-[#6b7a1f]"
            onClick={() => navigate(`/master/${tableName}`)}
          >
            Back
          </button>
          <div>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded mr-2 hover:bg-green-600"
              onClick={handleEdit}
              disabled={loading}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleDelete}
              disabled={loading}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewRecord
