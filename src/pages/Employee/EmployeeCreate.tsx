import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import EmployeeBasicForm from "./Forms/EmployeeBasicForm";
import ContactForm from "./Forms/ContactForm"; // New import
import FamilyForm from "./Forms/FamilyForm";
import ServiceForm from "./Forms/ServiceForm";
import PaymentForm from "./Forms/PaymentForm";
import SecurityForm from "./Forms/SecurityForm";
import EmpMedicalForm from "./Forms/EmpMedicalForm";
import EmpAwardForm from "./Forms/EmpAwardForm";
import EmpMissionForm from "./Forms/EmpMissionForm";

const EmployeeCreate = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic"); // New: Tab state
  const [empNo, setEmpNo] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  // Basic + Contact validation in useForm
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      emp_no: "",
      nic_no: "",
      passport_no: "",
      first_name: "",
      last_name: "",
      dob: "",
      gender: "",
      religion: "",
      nationality: "Sri Lankan",
      photo: null,
      // Contact section
      contact: {
        emp_no: "",
        telephone: "",
        email: "",
        address: "",
      },
      family: {
        emp_no: "",
        marital_status: "",
        spouse_name: "",
        number_of_children: "",
      },
      service: {
        emp_no: "",
        service_no: "",
        regiment_id: "",
        unit_id: "",
        rank_id: "",
      },
      promotion: {
        rank_id: "",
        appointment_id: "",
        a_date: "",
        reason: "",
      },
      posting: {
        unit_id: "",
        rank_id: "",
        regiment_id: "",
        appointment_id: "",
        p_date: "",
      },
      payment: {
        emp_no: "",
        pay_code: "",
        basic_pay: "",
        bank_acc_no: "",
        insurance_no: "",
        epf_no: "",
        allowance_id: "",
        loan_id: "",
      },
      health: {
        emp_no: "",
        blood_group: "",
        height: "",
        weight: "",
        bmi: "",
        fitness_id: "",
      },
      medical_history: {
        check_date: "",
        expire_date: "",
        status: "",
      },
      security: {
        emp_no: "",
        s_level: "",
        issue_date: "",
        expire_date: "",
        clearance_id: "",
      },
      emp_medical: {
        emp_no: "",
        medical_id: "",
        issue_date: "",
        expire_date: "",
        status: "",
      },
      emp_award: [
        {
          emp_no: "",
          award_id: "",
          achieve_date: "",
          expire_date: "",
          description: "",
        },
      ],
      emp_mission: [
        {
          emp_no: "",
          mission_id: "",
          start_date: "",
          expire_date: "",
          role: "",
        },
      ],
    },
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;
  const watchedEmpNo = watch("emp_no");

  // Auto-update contact.emp_no when empNo changes
  useEffect(() => {
    if (empNo) {
      methods.setValue("contact.emp_no", empNo);
    }
  }, [empNo, methods]);

  const generateEmpNo = () => {
    const generated = `EMP${Date.now().toString().slice(-7)}`;
    methods.setValue("emp_no", generated);
    setEmpNo(generated);
  };

  const onSubmit = (formData) => {
    setSubmitLoading(true);
    console.log("Full Form Data:", formData); // Logs basic + contact
    alert("Employee with Contact created! Check console.");
    setSubmitLoading(false);
    navigate("/employee");
  };

  const tabSections = [
    {
      key: "basic",
      label: "Basic Details",
      component: <EmployeeBasicForm empNo={empNo} />,
    },
    {
      key: "contact",
      label: "Contact",
      component: <ContactForm empNo={empNo} />,
    },
    { key: "family", label: "Family", component: <FamilyForm empNo={empNo} /> },
    {
      key: "service",
      label: "Service / Promotion / Posting",
      component: <ServiceForm empNo={empNo} />,
    },
    {
      key: "payment",
      label: "Payment",
      component: <PaymentForm empNo={empNo} />,
    },
    {
      key: "security",
      label: "Security",
      component: <SecurityForm empNo={empNo} />,
    },
    {
      key: "emp_medical",
      label: "Emp Medical",
      component: <EmpMedicalForm empNo={empNo} />,
    }, // New tab
    {
      key: "emp_award",
      label: "Emp Award",
      component: <EmpAwardForm empNo={empNo} />,
    },
    {
      key: "emp_mission",
      label: "Emp Mission",
      component: <EmpMissionForm empNo={empNo} />,
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
            {/* Tabs Navigation – New */}
            <div className="flex justify-center mb-6 border-b">
              {tabSections.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  className={`px-6 py-3 mr-2 font-medium rounded-t-lg transition-colors ${
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

            {/* Active Tab Content – New */}
            <div className="mb-6">
              {tabSections.find((tab) => tab.key === activeTab)?.component}
            </div>

            {/* Generate Button – Only in Basic */}
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

            {/* Error Summary */}
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

            {/* Buttons */}
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
