import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const EmployeeView = () => {
  const navigate = useNavigate();
  const { emp_no } = useParams();
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (!emp_no) {
        setError("Employee number (emp_no) is missing. Check route setup.");
        console.error("emp_no is undefined:", emp_no);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log(
          `Fetching data from: http://localhost:3000/employee/${emp_no}`
        );
        const response = await fetch(
          `http://localhost:3000/employee/${emp_no}`
        );
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(
          "Fetched employee data in EmployeeView:",
          data,
          "emp no is",
          emp_no
        );
        setEmployeeData(data);
      } catch (error) {
        setError(
          `Failed to fetch employee data: ${error.message}. Please try again later.`
        );
        console.error("Error fetching employee data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeeData();
  }, [emp_no]); // Ensures re-run when emp_no changes

  const sectionButtons = [
    "family",
    "contact",
    "service",
    "health",
    "promotion",
    "posting",
    "payment",
    "medical-history",
    "security",
    "emp-medical",
    "emp-award",
    "emp-mission",
  ];

  const handleSectionClick = (section) => {
    navigate(`/employee/${emp_no}/${section}`);
  };

  const handleEdit = () => {
    navigate(`/employee/${emp_no}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete employee ${emp_no}?`)) {
      try {
        const response = await fetch(
          `http://localhost:3000/employee/${emp_no}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete employee");
        }
        navigate("/employee");
      } catch (error) {
        setError(
          `Failed to delete employee: ${error.message}. Please try again.`
        );
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h2 className="text-2xl mb-4 text-center font-semibold">
        Employee Details (Emp No: {emp_no})
      </h2>
      <div className="max-w-6xl mx-auto p-4 bg-white border rounded shadow">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl mb-2 font-semibold">Basic Details</h3>
            {employeeData ? (
              Object.entries(employeeData).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-center mb-2"
                >
                  <strong className="capitalize">{key}:</strong>
                  <span>{value}</span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No details available.</p>
            )}
          </div>

          <div className="border-t pt-8 ">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-6">
              {sectionButtons.map((section) => (
                <button
                  key={section}
                  className="px-4 py-2 bg-[#7c8b24] text-white rounded hover:bg-[#6b7a1f]"
                  onClick={() => handleSectionClick(section)}
                >
                  {section.charAt(0).toUpperCase() +
                    section.slice(1).replace("-", " ")}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button
          className="mt-6 px-4 py-2 bg-[#7c8b24] text-white rounded hover:bg-[#6b7a1f]"
          onClick={() => navigate("/employee")}
        >
          Back to Employee List
        </button>
        <div className="mt-4 flex space-x-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeView;
