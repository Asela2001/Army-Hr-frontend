import axios from "axios";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import EmployeeBasicForm from "./Forms/EmployeeBasicForm";
import ContactForm from "./Forms/ContactForm";
import FamilyForm from "./Forms/FamilyForm";
import ServiceForm from "./Forms/ServiceForm";
import HealthForm from "./Forms/HealthForm";
import PaymentForm from "./Forms/PaymentForm";
import SecurityForm from "./Forms/SecurityForm";
import EmpAwardForm from "./Forms/EmpAwardForm";
import EmpMedicalForm from "./Forms/EmpMedicalForm";
import EmpMissionForm from "./Forms/EmpMissionForm";

const EmployeeCreate = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const [empNo, setEmpNo] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

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
      marital_status: "",
      spouse_name: "",
      number_of_children: 0,
      contact: {
        emp_no: "",
        telephone: "",
        email: "",
        address: "",
      },
      service: {
        emp_no: "",
        service_no: "",
        regiment_id: "",
        unit_id: "",
        rank_id: "",
      },
      promotion: {
        emp_no: "",
        rank_id: "",
        appointment_id: "",
        a_date: "",
        reason: "",
      },
      posting: {
        emp_no: "",
        unit_id: "",
        rank_id: "",
        regiment_id: "",
        appointment_id: "",
        p_date: "",
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
        emp_no: "",
        check_date: "",
        expire_date: "",
        status: "",
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
      security: {
        emp_no: "",
        s_level: "",
        issue_date: "",
        expire_date: "",
        clearance_id: "",
      },
      emp_award: [],
      emp_medical: [],
      emp_mission: [],
    },
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
  } = methods;
  const watchedEmpNo = watch("emp_no");

  useEffect(() => {
    if (watchedEmpNo) {
      setEmpNo(watchedEmpNo);
    }
  }, [watchedEmpNo]);

  // Sync emp_no to all nested fields when it changes
  useEffect(() => {
    if (watchedEmpNo) {
      // Single objects
      setValue("contact.emp_no", watchedEmpNo);
      setValue("service.emp_no", watchedEmpNo);
      setValue("promotion.emp_no", watchedEmpNo);
      setValue("posting.emp_no", watchedEmpNo);
      setValue("health.emp_no", watchedEmpNo);
      setValue("medical_history.emp_no", watchedEmpNo);
      setValue("payment.emp_no", watchedEmpNo);
      setValue("security.emp_no", watchedEmpNo);

      // Arrays: update existing items
      const awards = getValues("emp_award") || [];
      setValue(
        "emp_award",
        awards.map((item) => ({ ...item, emp_no: watchedEmpNo }))
      );

      const medicals = getValues("emp_medical") || [];
      setValue(
        "emp_medical",
        medicals.map((item) => ({ ...item, emp_no: watchedEmpNo }))
      );

      const missions = getValues("emp_mission") || [];
      setValue(
        "emp_mission",
        missions.map((item) => ({ ...item, emp_no: watchedEmpNo }))
      );
    }
  }, [watchedEmpNo, setValue, getValues]);

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const createRelatedData = async (createdEmpNo, formData) => {
    // Helper to post single related entity
    const postRelated = async (endpoint, payload, entityName) => {
      console.log(`Attempting to post ${entityName}:`, payload); // Debug log
      const cleanPayload = { ...payload };
      delete cleanPayload.emp_no; // Remove emp_no as it's in param
      if (
        Object.values(cleanPayload).some(
          (val) => val !== null && val !== undefined && val !== "" && val !== 0
        )
      ) {
        console.log(`Posting to ${endpoint} payload:`, cleanPayload); // Debug log
        try {
          const res = await axios.post(
            `http://localhost:3000/employee/${createdEmpNo}${endpoint}`,
            cleanPayload
          );
          console.log(`${entityName} created:`, res.data); // Debug log
        } catch (err) {
          console.error(
            `Failed to create ${entityName}:`,
            err.response?.data || err.message
          );
          // Don't throw, continue with others
        }
      } else {
        console.log(`Skipping ${entityName}: no valid data`); // Debug log
      }
    };

    // Contact (focus for debugging)
    await postRelated("/contact", formData.contact, "Contact");


    // Service
    await postRelated("/service", formData.service, "Service");

    // Promotion
    await postRelated("/promotion", formData.promotion, "Promotion");

    // Posting
    await postRelated("/posting", formData.posting, "Posting");

    // Health
    await postRelated("/health", formData.health, "Health");

    // Medical History
    await postRelated(
      "/medical-history",
      formData.medical_history,
      "Medical History"
    );

    // Payment
    await postRelated("/payment", formData.payment, "Payment");

    // Security
    await postRelated("/security", formData.security, "Security");

    // Arrays
    if (formData.emp_award && formData.emp_award.length > 0) {
      console.log("Creating awards:", formData.emp_award);
      for (const item of formData.emp_award) {
        const cleanPayload = { ...item };
        delete cleanPayload.emp_no;
        try {
          const res = await axios.post(
            `http://localhost:3000/employee/${createdEmpNo}/emp-award`,
            cleanPayload
          );
          console.log("Award created:", res.data);
        } catch (err) {
          console.error(
            "Failed to create award:",
            err.response?.data || err.message
          );
        }
      }
    }

    if (formData.emp_medical && formData.emp_medical.length > 0) {
      console.log("Creating medicals:", formData.emp_medical);
      for (const item of formData.emp_medical) {
        const cleanPayload = { ...item };
        delete cleanPayload.emp_no;
        try {
          const res = await axios.post(
            `http://localhost:3000/employee/${createdEmpNo}/emp-medical`,
            cleanPayload
          );
          console.log("Medical created:", res.data);
        } catch (err) {
          console.error(
            "Failed to create medical:",
            err.response?.data || err.message
          );
        }
      }
    }

    if (formData.emp_mission && formData.emp_mission.length > 0) {
      console.log("Creating missions:", formData.emp_mission);
      for (const item of formData.emp_mission) {
        const cleanPayload = { ...item };
        delete cleanPayload.emp_no;
        try {
          const res = await axios.post(
            `http://localhost:3000/employee/${createdEmpNo}/emp-mission`,
            cleanPayload
          );
          console.log("Mission created:", res.data);
        } catch (err) {
          console.error(
            "Failed to create mission:",
            err.response?.data || err.message
          );
        }
      }
    }
  };

  const onSubmit = async (formData) => {
    setSubmitLoading(true);
    try {
      console.log("Full Form Data:", formData);

      // Prepare employee payload (basic + family fields)
      const photoBase64 = formData.photo
        ? await fileToBase64(formData.photo[0])
        : null;
      const employeePayload = {
        emp_no: formData.emp_no,
        nic_no: formData.nic_no,
        passport_no: formData.passport_no || null,
        first_name: formData.first_name,
        last_name: formData.last_name,
        dob: formData.dob,
        gender: formData.gender,
        religion: formData.religion || null,
        nationality: formData.nationality,
        photo_id: photoBase64,
        marital_status: formData.marital_status || null,
        spouse_name: formData.spouse_name || null,
        number_of_children: formData.number_of_children || 0,
      };
      console.log("Payload to /employee:", employeePayload);

      const employeeRes = await axios.post(
        "http://localhost:3000/employee",
        employeePayload
      );
      console.log("Employee Response:", employeeRes.data);

      const createdEmpNo = employeeRes.data.emp_no || formData.emp_no;
      console.log("Employee created:", createdEmpNo);

      // Create related data
      await createRelatedData(createdEmpNo, formData);

      alert(`Employee created successfully! ID: ${createdEmpNo}`);
      navigate(`/employee/${createdEmpNo}`);
    } catch (error) {
      console.error("Submission failed:", error);
      console.error("Error Response:", error.response?.data);
      alert(
        `Creation failed: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const tabSections = [
    {
      key: "basic",
      label: "Basic Details",
      component: <EmployeeBasicForm empNo={empNo} />,
    },
    {
      key: "contact",
      label: "Contact Details",
      component: <ContactForm empNo={empNo} />,
    },
    {
      key: "family",
      label: "Family Details",
      component: <FamilyForm empNo={empNo} />,
    },
    {
      key: "service",
      label: "Service Details",
      component: <ServiceForm empNo={empNo} />,
    },
    {
      key: "health",
      label: "Health Details",
      component: <HealthForm empNo={empNo} />,
    },
    {
      key: "payment",
      label: "Payment Details",
      component: <PaymentForm empNo={empNo} />,
    },
    {
      key: "security",
      label: "Security Details",
      component: <SecurityForm empNo={empNo} />,
    },
    {
      key: "awards",
      label: "Awards",
      component: <EmpAwardForm empNo={empNo} />,
    },
    {
      key: "medicals",
      label: "Medical Records",
      component: <EmpMedicalForm empNo={empNo} />,
    },
    {
      key: "missions",
      label: "Missions",
      component: <EmpMissionForm empNo={empNo} />,
    },
  ];

  const currentTabIndex = tabSections.findIndex((tab) => tab.key === activeTab);
  const isLastTab = currentTabIndex === tabSections.length - 1;

  const handleNext = () => {
    if (currentTabIndex < tabSections.length - 1) {
      setActiveTab(tabSections[currentTabIndex + 1].key);
    }
  };

  const handlePrev = () => {
    if (currentTabIndex > 0) {
      setActiveTab(tabSections[currentTabIndex - 1].key);
    }
  };

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
            {/* Tabs Navigation */}
            <div className="flex justify-center mb-6 border-b flex-wrap">
              {tabSections.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  className={`px-3 py-3 mr-1 mb-2 font-medium rounded-t-lg transition-colors text-sm ${
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
            <div className="flex justify-between space-x-4">
              {currentTabIndex > 0 && (
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={handlePrev}
                >
                  Previous
                </button>
              )}
              <button
                type="button"
                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => navigate("/employee")}
              >
                Cancel
              </button>
              {isLastTab ? (
                <button
                  type="submit"
                  disabled={submitLoading || !watchedEmpNo}
                  className="px-6 py-2 bg-[#7c8b24] text-white rounded hover:bg-[#6b7a1f] disabled:opacity-50"
                >
                  {submitLoading ? "Creating..." : "Create Employee"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!watchedEmpNo}
                  className="px-6 py-2 bg-[#7c8b24] text-white rounded hover:bg-[#6b7a1f] disabled:opacity-50"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default EmployeeCreate;
