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

  const downloadTemplate = () => {
    // All flattened fields from defaultValues (excluding photo and arrays)
    const headers = [
      "emp_no",
      "nic_no",
      "passport_no",
      "first_name",
      "last_name",
      "dob",
      "gender",
      "religion",
      "nationality",
      "family_id",
      "marital_status",
      "spouse_name",
      "number_of_children",
      "contact.contact_id",
      "contact.telephone",
      "contact.email",
      "contact.address",
      "service.service_id",
      "service.service_no",
      "service.regiment_id",
      "service.unit_id",
      "service.rank_id",
      "promotion.promotion_id",
      "promotion.rank_id",
      "promotion.appointment_id",
      "promotion.a_date",
      "promotion.reason",
      "posting.posting_id",
      "posting.unit_id",
      "posting.rank_id",
      "posting.regiment_id",
      "posting.appointment_id",
      "posting.p_date",
      "health.health_id",
      "health.blood_group",
      "health.height",
      "health.weight",
      "health.bmi",
      "health.fitness_id",
      "medical_history.mh_id",
      "medical_history.check_date",
      "medical_history.expire_date",
      "medical_history.status",
      "payment.payment_id",
      "payment.pay_code",
      "payment.basic_pay",
      "payment.bank_acc_no",
      "payment.insurance_no",
      "payment.epf_no",
      "payment.allowance_id",
      "payment.loan_id",
      "security.security_id",
      "security.s_level",
      "security.issue_date",
      "security.expire_date",
      "security.clearance_id",
    ];

    // Sample data: 2 rows with dummy values
    const sampleData = [
      headers, // Header row
      // Row 1: Sample Employee 1
      [
        "EMP001",
        "123456789V",
        "",
        "John",
        "Doe",
        "1990-01-01",
        "M",
        "Christian",
        "Sri Lankan",
        "FAM001",
        "Married",
        "Jane Doe",
        2,
        "CNT001",
        "0771234567",
        "john@example.com",
        "123 Main St",
        "SRV001",
        "SE-001",
        "REG001",
        "UNIT001",
        "RANK001",
        "PROM001",
        "RANK002",
        "APP001",
        "2020-01-01",
        "Promotion for excellence",
        "POST001",
        "UNIT002",
        "RANK002",
        "REG002",
        "APP002",
        "2020-06-01",
        "HLTH001",
        "A+",
        "175",
        "70",
        "22.86",
        "FIT001",
        "MH001",
        "2023-01-01",
        "2024-01-01",
        "Active",
        "PAY001",
        "PC001",
        50000,
        "1234567890",
        "INS001",
        "EPF001",
        "ALW001",
        "LOAN001",
        "SEC001",
        "High",
        "2020-01-01",
        "2025-01-01",
        "CLR001",
      ],
      // Row 2: Sample Employee 2
      [
        "EMP002",
        "987654321V",
        "P001",
        "Jane",
        "Smith",
        "1985-05-15",
        "F",
        "Buddhist",
        "Sri Lankan",
        "FAM002",
        "Single",
        "",
        0,
        "CNT002",
        "0779876543",
        "jane@example.com",
        "456 Oak Ave",
        "SRV002",
        "SE-002",
        "REG002",
        "UNIT002",
        "RANK002",
        "PROM002",
        "RANK003",
        "APP002",
        "2021-03-01",
        "Merit promotion",
        "POST002",
        "UNIT003",
        "RANK003",
        "REG003",
        "APP003",
        "2021-09-01",
        "HLTH002",
        "O-",
        "165",
        "55",
        "20.25",
        "FIT002",
        "MH002",
        "2023-06-01",
        "2024-06-01",
        "Pending",
        "PAY002",
        "PC002",
        60000,
        "0987654321",
        "INS002",
        "EPF002",
        "ALW002",
        "LOAN002",
        "SEC002",
        "Medium",
        "2021-01-01",
        "2026-01-01",
        "CLR002",
      ],
    ];

    const wb = XLSX.utils.book_new();

    // Main sheet
    const ws = XLSX.utils.aoa_to_sheet(sampleData);
    XLSX.utils.book_append_sheet(wb, ws, "Employees");

    // Instructions sheet
    const instructions = [
      ["Instructions for Bulk Upload"],
      [""],
      [
        "1. Fill in all required fields (marked with * in DTO). Use YYYY-MM-DD for dates.",
      ],
      ["2. Provide manual IDs (e.g., service_id) as in manual form."],
      [
        "3. Nested fields: Use dot notation in headers (e.g., contact.telephone).",
      ],
      [
        "4. Arrays (awards, medicals, missions): Not supported in bulk—use manual form.",
      ],
      ["5. Photo: Not supported (file upload)."],
      ["6. FKs (e.g., regiment_id): Must match existing master data."],
      [""],
      [
        "Required Basic Fields: emp_no*, first_name*, last_name*, nic_no*, dob*, gender*",
      ],
      [""],
      ["Upload via 'Upload Excel' after filling."],
    ];
    const instrWs = XLSX.utils.aoa_to_sheet(instructions);
    XLSX.utils.book_append_sheet(wb, instrWs, "Instructions");

    // Auto-fit columns
    const colWidths = headers.map((h) => ({ wch: Math.max(15, h.length + 2) }));
    ws["!cols"] = colWidths;

    XLSX.writeFile(wb, "employee_full_template.xlsx");
    console.log("Full template downloaded: employee_full_template.xlsx");
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
          <button
            className="px-4 py-2 bg-[#7c8b24] text-white rounded hover:bg-blue-700"
            onClick={downloadTemplate}
          >
            Download Template
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
