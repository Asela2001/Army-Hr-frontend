import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const EmpMedicalForm = ({ empNo, masterData }) => {
  // Fixed props
  const { control, register } = useFormContext(); // Added register
  const { fields, append, remove } = useFieldArray({
    control,
    name: "emp_medical",
  });
  const [newMedical, setNewMedical] = useState({
    medical_id: "",
    issue_date: "",
    expire_date: "",
    status: "",
  });

  const addMedical = () => {
    if (
      newMedical.medical_id &&
      newMedical.issue_date &&
      newMedical.expire_date &&
      newMedical.status
    ) {
      append({ ...newMedical, emp_no: empNo }); // Fixed empNo
      setNewMedical({
        medical_id: "",
        issue_date: "",
        expire_date: "",
        status: "",
      });
    }
  };

  return (
    <div>
      {/* Hidden emp_no not needed here; handled in append */}
      {/* Add New Row Form */}
      <div className="mb-4 p-4 bg-gray-50 rounded">
        <h4 className="font-semibold mb-2">Add New Medical Record</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={newMedical.medical_id}
            onChange={(e) =>
              setNewMedical({ ...newMedical, medical_id: e.target.value })
            }
            className="p-2 border rounded"
          >
            <option value="">Select Medical</option>
            {masterData.medicals.map(
              (
                m // Fixed masterData
              ) => (
                <option key={m.medical_id} value={m.medical_id}>
                  {m.name} ({m.type})
                </option>
              )
            )}
          </select>
          <input
            type="date"
            value={newMedical.issue_date}
            onChange={(e) =>
              setNewMedical({ ...newMedical, issue_date: e.target.value })
            }
            className="p-2 border rounded"
            placeholder="Issue Date"
          />
          <input
            type="date"
            value={newMedical.expire_date}
            onChange={(e) =>
              setNewMedical({ ...newMedical, expire_date: e.target.value })
            }
            className="p-2 border rounded"
            placeholder="Expire Date"
          />
          <input
            value={newMedical.status}
            onChange={(e) =>
              setNewMedical({ ...newMedical, status: e.target.value })
            }
            className="p-2 border rounded"
            placeholder="Status"
          />
        </div>
        <button
          type="button"
          onClick={addMedical}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Medical
        </button>
      </div>
      {/* Existing Rows */}
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex items-center p-2 border rounded mb-2"
        >
          <select
            {...register(`emp_medical.${index}.medical_id`)}
            className="flex-1 p-2 border rounded mr-2"
          >
            {" "}
            {/* register now defined */}
            <option value="">Select</option>
            {masterData.medicals.map(
              (
                m // Fixed
              ) => (
                <option key={m.medical_id} value={m.medical_id}>
                  {m.name}
                </option>
              )
            )}
          </select>
          <input
            type="date"
            {...register(`emp_medical.${index}.issue_date`)}
            className="flex-1 p-2 border rounded mr-2"
          />
          <input
            type="date"
            {...register(`emp_medical.${index}.expire_date`)}
            className="flex-1 p-2 border rounded mr-2"
          />
          <input
            {...register(`emp_medical.${index}.status`)}
            className="flex-1 p-2 border rounded mr-2"
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default EmpMedicalForm;
