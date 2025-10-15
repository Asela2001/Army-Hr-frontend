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
      family_id: "",
      marital_status: "",
      spouse_name: "",
      number_of_children: 0,
      contact: {
        emp_no: "",
        contact_id: "",
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
        posting_id: "",
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
    watch,
    formState: { errors },
    setValue,
    getValues,
    trigger,
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

  const postSingleEntity = async (endpoint, payload, entityName) => {
    console.log(`Attempting to post ${entityName}:`, payload);
    let cleanPayload = { ...payload };

    // Don't delete emp_no for family endpoint
    if (endpoint !== "/family" && endpoint !== "/contact" && endpoint !== "/service" && endpoint !== "/promotion" && endpoint !== "/posting" && endpoint !== "/health" && endpoint !== "/medical-history" && endpoint !== "/payment" && endpoint !== "/security") {
      delete cleanPayload.emp_no;
    }

    cleanPayload = Object.fromEntries(
      Object.entries(cleanPayload).filter(
        ([_, value]) => value != null && value !== undefined && value !== ""
      )
    );

    if (Object.keys(cleanPayload).length > 0) {
      console.log(`Posting to ${endpoint} payload:`, cleanPayload);
      try {
        const res = await axios.post(
          `http://localhost:3000/employee/${empNo}${endpoint}`,
          cleanPayload
        );
        console.log(`${entityName} created:`, res.data);
      } catch (err) {
        console.error(
          `Failed to create ${entityName}:`,
          err.response?.data || err.message
        );
        throw err;
      }
    } else {
      console.log(`Skipping ${entityName}: no valid data after cleaning`);
    }
  };

  const postArrayItem = async (endpoint, item, entityName) => {
    console.log(`Attempting to post ${entityName} item:`, item);
    let cleanPayload = { ...item };
    delete cleanPayload.emp_no;

    cleanPayload = Object.fromEntries(
      Object.entries(cleanPayload).filter(
        ([_, value]) => value != null && value !== undefined && value !== ""
      )
    );

    if (Object.keys(cleanPayload).length > 0) {
      console.log(`Posting to ${endpoint} payload:`, cleanPayload);
      try {
        const res = await axios.post(
          `http://localhost:3000/employee/${empNo}${endpoint}`,
          cleanPayload
        );
        console.log(`${entityName} item created:`, res.data);
      } catch (err) {
        console.error(
          `Failed to create ${entityName} item:`,
          err.response?.data || err.message
        );
        throw err;
      }
    } else {
      console.log(`Skipping ${entityName} item: no valid data after cleaning`);
    }
  };

  const handleTabSave = async (tabKey) => {
    const isValid = await trigger();
    if (!isValid) {
      alert("Please fix validation errors before saving.");
      return;
    }

    const formData = getValues();

    try {
      if (tabKey === "basic") {
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
        };
        console.log("Payload to /employee:", employeePayload);

        const employeeRes = await axios.post(
          "http://localhost:3000/employee",
          employeePayload
        );
        console.log("Employee Response:", employeeRes.data);

        const createdEmpNo = employeeRes.data.emp_no || formData.emp_no;
        setEmpNo(createdEmpNo);
        console.log("Basic employee created:", createdEmpNo);
        alert("Basic details saved successfully!");
      } else {
        if (!empNo) {
          alert("Please save basic details first to get Employee No.");
          return;
        }

        switch (tabKey) {
          case "contact": {
            const contactPayload = {
              contact_id: formData.contact.contact_id || null,
              telephone: formData.contact.telephone || null,
              email: formData.contact.email || null,
              address: formData.contact.address || null,
              emp_no: formData.emp_no || empNo,
            };
            await postSingleEntity("/contact", contactPayload, "Contact");
            break;
          }
          case "family": {
            const familyPayload = {
              family_id: formData.family_id || null,
              marital_status: formData.marital_status || null,
              spouse_name: formData.spouse_name || null,
              number_of_children: formData.number_of_children || 0,
              emp_no: formData.emp_no || empNo,
            };
            await postSingleEntity("/family", familyPayload, "Family");
            break;
          }
          case "service": {
            // Create Service first
            const servicePayload = {
              service_id: formData.service.service_id,
              service_no: formData.service.service_no || null,
              regiment_id: formData.service.regiment_id || null,
              unit_id: formData.service.unit_id || null,
              rank_id: formData.service.rank_id || null,
              emp_no: empNo,
            };
            const serviceRes = await postSingleEntity(
              "/service",
              servicePayload,
              "Service"
            );
            const serviceId =
              serviceRes?.data?.service_id || formData.service.service_id;// Use created service_id from response

            // Create Promotion (uses service_id)
            const promotionPayload = {
              promotion_id: formData.promotion.promotion_id,
              service_id: serviceId,
              rank_id: formData.promotion.rank_id || null,
              appointment_id: formData.promotion.appointment_id || null,
              a_date: formData.promotion.a_date || null,
              reason: formData.promotion.reason || null,
            };
            await postSingleEntity("/promotion", promotionPayload, "Promotion");

            // Create Posting (no emp_no)
            const postingPayload = {
              posting_id: formData.posting.posting_id,
              service_id: serviceId,
              unit_id: formData.posting.unit_id || null,
              rank_id: formData.posting.rank_id || null,
              regiment_id: formData.posting.regiment_id || null,
              appointment_id: formData.posting.appointment_id || null,
              p_date: formData.posting.p_date || null,
            };
            await postSingleEntity("/posting", postingPayload, "Posting");
            break;
          }
          case "health": {
            // Create Health first
            const healthPayload = {
              health_id: formData.health.health_id,
              blood_group: formData.health.blood_group || null,
              height: formData.health.height || null,
              weight: formData.health.weight || null,
              bmi: formData.health.bmi || null,
              fitness_id: formData.health.fitness_id || null,
              emp_no: empNo,
            };
            const healthRes = await postSingleEntity("/health", healthPayload, "Health");
            const healthId = healthRes?.data?.health_id || formData.health.health_id;

            // Create MedicalHistory (no emp_no, use health_id)
            const medicalHistoryPayload = {
              mh_id: formData.medical_history.mh_id,
              health_id: healthId,
              check_date: formData.medical_history.check_date || null,
              expire_date: formData.medical_history.expire_date || null,
              status: formData.medical_history.status || null,
            };
            await postSingleEntity("/medical-history", medicalHistoryPayload, "Medical History");
            break;
          }
          case "payment": {
            const paymentPayload = {
              payment_id: formData.payment.payment_id,
              pay_code: formData.payment.pay_code || null,
              basic_pay: formData.payment.basic_pay || null,
              bank_acc_no: formData.payment.bank_acc_no || null,
              insurance_no: formData.payment.insurance_no || null,
              epf_no: formData.payment.epf_no || null,
              allowance_id: formData.payment.allowance_id || null,
              loan_id: formData.payment.loan_id || null,
              emp_no: empNo,
            };
            await postSingleEntity("/payment", paymentPayload, "Payment");
            break;
          }
          case "security": {
            const securityPayload = {
              security_id: formData.security.security_id,
              s_level: formData.security.s_level || null,
              issue_date: formData.security.issue_date || null,
              expire_date: formData.security.expire_date || null,
              clearance_id: formData.security.clearance_id || null,
              emp_no: empNo,
            };
            await postSingleEntity("/security", securityPayload, "Security");
            break;
          }
          case "awards":
            if (formData.emp_award && formData.emp_award.length > 0) {
              console.log("Creating awards:", formData.emp_award);
              for (const item of formData.emp_award) {
                await postArrayItem("/emp-award", item, "Award");
              }
            }
            break;
          case "medicals":
            if (formData.emp_medical && formData.emp_medical.length > 0) {
              console.log("Creating medicals:", formData.emp_medical);
              for (const item of formData.emp_medical) {
                await postArrayItem("/emp-medical", item, "Medical");
              }
            }
            break;
          case "missions":
            if (formData.emp_mission && formData.emp_mission.length > 0) {
              console.log("Creating missions:", formData.emp_mission);
              for (const item of formData.emp_mission) {
                await postArrayItem("/emp-mission", item, "Mission");
              }
            }
            break;
          default:
            console.log(`No save logic for tab: ${tabKey}`);
            return;
        }
        alert(
          `${
            tabKey.charAt(0).toUpperCase() + tabKey.slice(1)
          } details saved successfully!`
        );
      }
    } catch (error) {
      console.error(`Save failed for ${tabKey}:`, error);
      console.error("Error Response:", error.response?.data);
      alert(
        `Failed to save ${tabKey}: ${
          error.response?.data?.message || error.message
        }`
      );
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
  const isBasicTab = activeTab === "basic";
  const canSave = isBasicTab || !!empNo;

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
          <form className="bg-white rounded-lg shadow-md p-6">
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

            {/* ADD Button - Bottom Right */}
            <div className="flex justify-end mb-6">
              <button
                type="button"
                onClick={() => handleTabSave(activeTab)}
                disabled={!canSave || Object.keys(errors).length > 0}
                className="px-6 py-2 bg-[#7c8b24] text-white rounded hover:bg-[#6b7a1f] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ADD
              </button>
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

            {/* Navigation Buttons */}
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
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default EmployeeCreate;
