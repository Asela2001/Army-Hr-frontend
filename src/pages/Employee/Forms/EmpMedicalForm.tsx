import React, { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

// Hardcoded options for Medical dropdown (later fetch from master API)
const mockMedicals = [
  { id: "MED001", name: "Medical 1", type: "Type A" },
  { id: "MED002", name: "Medical 2", type: "Type B" },
];

const EmpMedicalForm = ({ empNo }) => {
  const { control, register } = useFormContext();
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
      append({ ...newMedical, emp_no: empNo });
      setNewMedical({
        medical_id: "",
        issue_date: "",
        expire_date: "",
        status: "",
      });
    } else {
      alert("Please fill all fields to add a record.");
    }
  };

  return (
    <div className="space-y-4">
      {/* Add New Row Form */}
      <div className="p-4 bg-gray-50 rounded">
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
            {mockMedicals.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.type})
              </option>
            ))}
          </select>
          <input
            type="date"
            value={newMedical.issue_date}
            onChange={(e) =>
              setNewMedical({ ...newMedical, issue_date: e.target.value })
            }
            className="p-2 border rounded"
          />
          <input
            type="date"
            value={newMedical.expire_date}
            onChange={(e) =>
              setNewMedical({ ...newMedical, expire_date: e.target.value })
            }
            className="p-2 border rounded"
          />
          <input
            value={newMedical.status}
            onChange={(e) =>
              setNewMedical({ ...newMedical, status: e.target.value })
            }
            className="p-2 border rounded"
            placeholder="Status"
            maxLength={10}
          />
        </div>
        <button
          type="button"
          onClick={addMedical}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Medical Record
        </button>
      </div>

      {/* Existing Rows */}
      <div>
        <h4 className="font-semibold mb-2">Medical Records</h4>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center p-2 border rounded mb-2 bg-white"
          >
            <select
              {...register(`emp_medical.${index}.medical_id`, {
                required: "Medical ID required",
              })}
              className="flex-1 p-2 border rounded mr-2"
            >
              <option value="">Select Medical</option>
              {mockMedicals.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              {...register(`emp_medical.${index}.issue_date`, {
                required: "Issue Date required",
              })}
              className="flex-1 p-2 border rounded mr-2"
            />
            <input
              type="date"
              {...register(`emp_medical.${index}.expire_date`, {
                required: "Expire Date required",
              })}
              className="flex-1 p-2 border rounded mr-2"
            />
            <input
              {...register(`emp_medical.${index}.status`, {
                required: "Status required",
                maxLength: { value: 10, message: "Max 10 chars" },
              })}
              className="flex-1 p-2 border rounded mr-2"
              maxLength={10}
            />
            <input
              type="hidden"
              {...register(`emp_medical.${index}.emp_no`)}
              value={empNo}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        {fields.length === 0 && (
          <p className="text-gray-500">No medical records added yet.</p>
        )}
      </div>
    </div>
  );
};

export default EmpMedicalForm;
