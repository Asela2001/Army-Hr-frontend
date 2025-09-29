import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router";

const CreateRecord = () => {
  const navigate = useNavigate();
  const { tableName } = useParams();
  const { state } = useLocation();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    if (state && state.columns) {
      setColumns(state.columns);
      // Initialize formData with empty values for each column
      const initialFormData = state.columns.reduce(
        (acc, column) => ({
          ...acc,
          [column]: "",
        }),
        {}
      );
      setFormData(initialFormData);
    } else {
      setError("No column information available. Please try again.");
    }
  }, [state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3000/master/${tableName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error("Failed to create record");
      navigate(`/master/${tableName}`);
    } catch (error) {
      setError("Failed to create record. Please try again.");
      console.error("Error creating record:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl mb-4 text-center font-semibold">
          Create New {tableName.charAt(0).toUpperCase() + tableName.slice(1)}{" "}
          Record
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading && <p className="text-center">Creating...</p>}
        {!columns.length && !error && (
          <p className="text-center">Loading form...</p>
        )}
        {columns.length > 0 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {columns.map((column) => (
              <div key={column}>
                <label className="block mb-1 capitalize">{column}</label>
                <input
                  type="text"
                  name={column}
                  value={formData[column] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="px-4 py-2 bg-[#7c8b24] text-white rounded hover:bg-[#6b7a1f]"
              disabled={loading}
            >
              Save
            </button>
            <button
              type="button"
              className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={() => navigate(`/master/${tableName}`)}
              disabled={loading}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateRecord;
