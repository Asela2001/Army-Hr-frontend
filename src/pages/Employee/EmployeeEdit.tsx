import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';

const EmployeeEdit = () => {
    const navigate = useNavigate();
    const { emp_no } = useParams();
    const [employeeData, setEmployeeData] = useState({});

    useEffect(() => {
      // Fetch employee data for editing
      fetch(`http://localhost:3000/employee/${emp_no}`)
        .then((res) => res.json())
        .then((data) => setEmployeeData(data));
    }, [emp_no]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      await fetch(`http://localhost:3000/employee/${emp_no}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      });
      navigate(`/employee/${emp_no}`);
    };

    const handleChange = (e) => {
      setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
    };
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-2xl mx-auto p-4 bg-white border rounded shadow">
        <h2 className="text-2xl mb-4 text-center font-semibold">
          Edit Employee (Emp No: {emp_no})
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(employeeData).map(([key, value]) => (
            <div key={key}>
              <label className="block mb-1 capitalize">{key}</label>
              <input
                type="text"
                name={key}
                value={value || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
          <button
            type="submit"
            className="px-4 py-2 bg-[#7c8b24] text-white rounded hover:bg-[#6b7a1f]"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={() => navigate(`/employee/${emp_no}`)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeEdit
