import axios from "axios";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; // Added missing import
import { useNavigate } from "react-router";
import * as Yup from "yup";

import EmployeeBasicForm from "./Forms/EmployeeBasicForm";
import FamilyForm from "./Forms/FamilyForm";
import ContactForm from "./Forms/ContactForm";
import ServiceForm from "./Forms/ServiceForm";
import PaymentForm from "./Forms/PaymentForm";
import HealthForm from "./Forms/HealthForm";
import SecurityForm from "./Forms/SecurityForm";
import EmpMedicalForm from "./Forms/EmpMedicalForm";
import EmpAwardForm from "./Forms/EmpAwardForm";
import EmpMissionForm from "./Forms/EmpMissionForm";

const EmployeeCreate = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const [empNo, setEmpNo] = useState("");
  const [masterData, setMasterData] = useState({
    ranks: [],
    appointments: [],
    units: [],
    regiments: [],
    allowances: [],
    loans: [],
    fitness: [],
    medicals: [],
    awards: [],
    missions: [],
    securityClearances: [],
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  // Fetch ALL master data for dropdowns
  useEffect(() => {
    fetchMasterData();
  }, []);

  const fetchMasterData = async () => {
    try {
      const [
        ranksRes,
        appointmentsRes,
        unitsRes,
        regimentsRes,
        allowancesRes,
        loansRes,
        fitnessRes,
        medicalsRes,
        awardsRes,
        missionsRes,
        securityClearancesRes,
      ] = await Promise.all([
        axios.get("http://localhost:3000/master/rank"),
        axios.get("http://localhost:3000/master/appointment"),
        axios.get("http://localhost:3000/master/unit"),
        axios.get("http://localhost:3000/master/regiment"),
        axios.get("http://localhost:3000/master/allowance"),
        axios.get("http://localhost:3000/master/loan"),
        axios.get("http://localhost:3000/master/fitness"),
        axios.get("http://localhost:3000/master/medical"),
        axios.get("http://localhost:3000/master/award"),
        axios.get("http://localhost:3000/master/mission"),
        axios.get("http://localhost:3000/master/security-clearance"),
      ]);
      setMasterData({
        ranks: ranksRes.data || [],
        appointments: appointmentsRes.data || [],
        units: unitsRes.data || [],
        regiments: regimentsRes.data || [],
        allowances: allowancesRes.data || [],
        loans: loansRes.data || [],
        fitness: fitnessRes.data || [],
        medicals: medicalsRes.data || [],
        awards: awardsRes.data || [],
        missions: missionsRes.data || [],
        securityClearances: securityClearancesRes.data || [],
      });
    } catch (error) {
      console.error("Failed to fetch master data:", error);
    }
  };

  // Extended Yup schema for ALL sections (unchanged)
  const validationSchema = Yup.object({
    // ... (keep as-is)
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      emp_no: "",
      emp_medical: [],
      emp_award: [],
      emp_mission: [],
    },
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods; // Added errors for display
  const watchedEmpNo = watch("emp_no");

  useEffect(() => {
    if (empNo && !watchedEmpNo) {
      methods.setValue("emp_no", empNo);
    }
  }, [empNo, watchedEmpNo, methods]);

  const generateEmpNo = async () => {
    const generated = `EMP${Date.now().toString().slice(-7)}`;
    methods.setValue("emp_no", generated);
    setEmpNo(generated);
  };

  const onSubmit = async (formData) => {
    setSubmitLoading(true);
    try {
      // ... (keep onSubmit as-is)
    } catch (error) {
      console.error("Creation failed:", error);
      alert(`Failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setSubmitLoading(false);
    }
  };

  const tabSections = [
    {
      key: "basic",
      label: "Employee Details",
      component: <EmployeeBasicForm empNo={empNo} />,
    },
    { key: "family", label: "Family", component: <FamilyForm empNo={empNo} /> },
    {
      key: "contact",
      label: "Contact",
      component: <ContactForm empNo={empNo} />,
    },
    {
      key: "service",
      label: "Service / Promotion / Posting",
      component: <ServiceForm empNo={empNo} masterData={masterData} />,
    }, // Added masterData
    {
      key: "payment",
      label: "Payment",
      component: <PaymentForm empNo={empNo} masterData={masterData} />,
    }, // Added props
    {
      key: "health",
      label: "Health / Medical History / Emp Medical",
      component: <HealthForm empNo={empNo} masterData={masterData} />,
    }, // Added masterData
    {
      key: "security",
      label: "Security",
      component: <SecurityForm empNo={empNo} masterData={masterData} />,
    }, // Added masterData
    {
      key: "emp_medical",
      label: "Emp Medical",
      component: <EmpMedicalForm empNo={empNo} masterData={masterData} />,
    }, // Fixed prop names
    {
      key: "emp_award",
      label: "Emp Award",
      component: <EmpAwardForm empNo={empNo} masterData={masterData} />,
    },
    {
      key: "emp_mission",
      label: "Emp Mission",
      component: <EmpMissionForm empNo={empNo} masterData={masterData} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create New Employee
        </h2>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-lg shadow-md p-6"
          >
            {/* Tabs Navigation (unchanged) */}
            <div className="flex flex-wrap justify-center mb-6 border-b">
              {tabSections.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  className={`px-6 py-3 mr-2 mb-2 font-medium rounded-t-lg transition-colors ${
                    activeTab === tab.key
                      ? "bg-[#7c8b24] text-white border-b-2 border-[#7c8b24]"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Active Tab Content */}
            <div className="mb-6">
              {tabSections.find((tab) => tab.key === activeTab)?.component}
            </div>

            {/* Generate EMP No (unchanged) */}
            {activeTab === "basic" && (
              <div className="mb-4 text-center">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={generateEmpNo}
                >
                  Generate EMP No
                </button>
              </div>
            )}

            {/* Error Summary (Added for better UX) */}
            {Object.keys(errors).length > 0 && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded">
                <h4 className="font-bold text-red-700">Validation Errors:</h4>
                <ul className="list-disc pl-5">
                  {Object.entries(errors).map(([key, error]) => (
                    <li
                      key={key}
                      className="text-red-600"
                    >{`${key}: ${error.message}`}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Submit/Cancel Buttons (unchanged) */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => navigate("/employee")}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitLoading || !watchedEmpNo}
                className="px-6 py-2 bg-[#7c8b24] text-white rounded hover:bg-[#6b7a1f] disabled:opacity-50"
              >
                {submitLoading ? "Creating..." : "Create Employee"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default EmployeeCreate;
