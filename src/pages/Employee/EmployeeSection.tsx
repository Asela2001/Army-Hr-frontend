import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const EmployeeSection = () => {
    const navigate = useNavigate();
    const { emp_no, section } = useParams();
    const [sectionData, setSectionData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editingRowId, setEditingRowId] = useState(null); // Track which row is being edited
    const [editedRow, setEditedRow] = useState({});

    // Move fetchSectionData to component scope
    const fetchSectionData = async () => {
      if (!emp_no || !section) {
        setError("Employee number or section is missing.");
        console.error("emp_no or section is undefined:", { emp_no, section });
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log(
          `Fetching section data from: http://localhost:3000/employee/${emp_no}/${section}`
        );
        const response = await fetch(
          `http://localhost:3000/employee/${emp_no}/${section}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSectionData(Array.isArray(data) ? data : []);
        console.log(`Fetched ${section} data for emp_no ${emp_no}:`, data);
      } catch (error) {
        setError(
          `Failed to fetch ${section} data: ${error.message}. Please try again later.`
        );
        console.error(`Error fetching ${section} data:`, error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchSectionData();
    }, [emp_no, section]);

    const renderValue = (value) => {
      if (value === null || value === undefined) return "N/A";
      if (typeof value === "object") {
        if (Array.isArray(value)) {
          return `[Array of ${value.length} items]`;
        }
        return JSON.stringify(value, null, 2);
      }
      return value.toString();
    };

    const getFilteredKeys = (row) => {
      return Object.keys(row).filter((key) => key !== "employee"); // Skip "employee" key
    };

    // Capitalize section name for title
    const capitalizedSection =
      section.charAt(0).toUpperCase() + section.slice(1).replace("-", " ");

    const startEdit = (row) => {
      setEditingRowId(row.id || row.family_id || index); // Use unique ID, fallback to index
      setEditedRow({ ...row });
    };

    const cancelEdit = () => {
      setEditingRowId(null);
      setEditedRow({});
    };

    const saveEdit = async (rowId) => {
      try {
        const response = await fetch(
          `http://localhost:3000/employee/${emp_no}/${section}/${rowId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedRow),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update record");
        }
        fetchSectionData();
        cancelEdit();
      } catch (error) {
        setError(`Failed to update record: ${error.message}`);
        console.error("Error updating record:", error);
      }
    };

    const deleteRow = async (rowId) => {
      if (
        window.confirm(
          `Are you sure you want to delete this ${capitalizedSection.toLowerCase()} record?`
        )
      ) {
        try {
          const response = await fetch(
            `http://localhost:3000/employee/${emp_no}/${section}/${rowId}`,
            {
              method: "DELETE",
            }
          );
          if (!response.ok) {
            throw new Error("Failed to delete record");
          }
          // Refetch data
          fetchSectionData();
        } catch (error) {
          setError(`Failed to delete record: ${error.message}`);
          console.error("Error deleting record:", error);
        }
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl mb-4 text-center font-semibold">
          {capitalizedSection} Details (Emp No: {emp_no})
        </h2>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!loading && !error && (
          <div className="space-y-4">
            {sectionData.length > 0 ? (
              sectionData.map((row, index) => {
                const rowId = row.id || row.family_id || index; // Use unique ID
                const isEditing = editingRowId === rowId;
                const filteredKeys = getFilteredKeys(row);

                return (
                  <div
                    key={rowId}
                    className="border p-4 rounded shadow bg-white"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {filteredKeys.map((key) => (
                        <div key={key} className="flex flex-col">
                          <label className="font-semibold capitalize text-sm text-gray-600 mb-1">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editedRow[key] || ""}
                              onChange={(e) =>
                                setEditedRow({
                                  ...editedRow,
                                  [key]: e.target.value,
                                })
                              }
                              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <span className="p-2 bg-gray-50 rounded">
                              {renderValue(row[key])}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end space-x-2">
                      {isEditing ? (
                        <>
                          <button
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            onClick={() => saveEdit(rowId)}
                          >
                            Save
                          </button>
                          <button
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            onClick={cancelEdit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => startEdit(row, rowId)}
                          >
                            Edit
                          </button>
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => deleteRow(rowId)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="border p-4 rounded shadow bg-white text-center text-gray-500">
                No {capitalizedSection.toLowerCase()} data available for this
                employee.
              </div>
            )}
          </div>
        )}
        <button
          className="mt-6 px-4 py-2 bg-[#7c8b24] text-white rounded hover:bg-[#6b7a1f]"
          onClick={() => navigate(`/employee/${emp_no}`)}
        >
          Back to Employee Details
        </button>
      </div>
    </div>
  );
}

export default EmployeeSection
