import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as XLSX from "xlsx";

const Employee = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/employee");
      const data = await response.json();
      setEmployeeData(data);
      console.log("Fetched employee data:", data);
    } catch (error) {
      setError("Failed to fetch employee data. Please try again later.");
      console.error("Error fetching employee data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExcelUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      try {
        const response = await fetch("http://localhost:3000/employee/bulk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jsonData),
        });

        if (!response.ok) {
          throw new Error("Failed to upload Excel file");
        }

        alert("Employees uploaded successfully!");
        fetchEmployeeData(); // Refetch instead of reload
      } catch (error) {
        alert(`Upload failed: ${error.message}`);
        console.error("Error uploading Excel:", error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleRowClick = (employee) => {
    const empNo = employee.emp_no || employee.id;
    if (empNo) {
      navigate(`/employee/${empNo}`);
    } else {
      console.error("No valid emp_no or id found:", employee);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl mb-4 text-center font-semibold">
          Employee List
        </h2>
        <div className="flex justify-between mb-4">
          <button
            className="px-4 py-2 bg-[#7c8b24] text-white rounded hover:bg-[#6b7a1f]"
            onClick={() => navigate("/employee/create")}
          >
            Create New Employee
          </button>
          <label className="px-4 py-2 bg-[#7c8b24] text-white rounded hover:bg-[#6b7a1f] cursor-pointer">
            Upload Excel
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleExcelUpload}
              className="hidden"
            />
          </label>
        </div>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {employeeData.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">NIC No</th>
                  <th className="border p-2">Gender</th>
                </tr>
              </thead>
              <tbody>
                {employeeData.map((employee) => (
                  <tr
                    key={employee.id || employee.emp_no}
                    className="hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleRowClick(employee)}
                  >
                    <td className="border p-2">
                      {employee.emp_no || employee.id}
                    </td>
                    <td className="border p-2">
                      {employee.first_name + " " + employee.last_name}
                    </td>
                    <td className="border p-2">{employee.nic_no}</td>
                    <td className="border p-2">{employee.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <button
          className="mt-6 px-4 py-2 bg-[#7c8b24] text-white rounded hover:bg-[#6b7a1f]"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Employee;
