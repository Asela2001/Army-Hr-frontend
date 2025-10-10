import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const EmpAwardForm = ({ empNo, masterData }) => {
  // Fixed prop names
  const { control, register } = useFormContext(); // Added register
  const { fields, append, remove } = useFieldArray({
    control,
    name: "emp_award",
  });
  const [newAward, setNewAward] = useState({
    award_id: "",
    achieve_date: "",
    expire_date: "",
    description: "",
  });

  const addAward = () => {
    if (
      newAward.award_id &&
      newAward.achieve_date &&
      newAward.expire_date &&
      newAward.description
    ) {
      append({ ...newAward, emp_no: empNo }); // Fixed emp_no
      setNewAward({
        award_id: "",
        achieve_date: "",
        expire_date: "",
        description: "",
      });
    }
  };

  return (
    <div>
      {/* Add New Row Form (unchanged, but uses masterData.awards) */}
      <div className="mb-4 p-4 bg-gray-50 rounded">
        <h4 className="font-semibold mb-2">Add New Award</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={newAward.award_id}
            onChange={(e) =>
              setNewAward({ ...newAward, award_id: e.target.value })
            }
            className="p-2 border rounded"
          >
            <option value="">Select Award</option>
            {masterData.awards.map(
              (
                a // Fixed masterData
              ) => (
                <option key={a.award_id} value={a.award_id}>
                  {a.name} ({a.type})
                </option>
              )
            )}
          </select>
          <input
            type="date"
            value={newAward.achieve_date}
            onChange={(e) =>
              setNewAward({ ...newAward, achieve_date: e.target.value })
            }
            className="p-2 border rounded"
            placeholder="Achieve Date"
          />
          <input
            type="date"
            value={newAward.expire_date}
            onChange={(e) =>
              setNewAward({ ...newAward, expire_date: e.target.value })
            }
            className="p-2 border rounded"
            placeholder="Expire Date"
          />
          <input
            value={newAward.description}
            onChange={(e) =>
              setNewAward({ ...newAward, description: e.target.value })
            }
            className="p-2 border rounded col-span-2"
            placeholder="Description"
            maxLength={50}
          />
        </div>
        <button
          type="button"
          onClick={addAward}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Award
        </button>
      </div>

      {/* Existing Rows */}
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex items-center p-2 border rounded mb-2"
        >
          <select
            {...register(`emp_award.${index}.award_id`)}
            className="flex-1 p-2 border rounded mr-2"
          >
            {" "}
            {/* Now register defined */}
            <option value="">Select</option>
            {masterData.awards.map(
              (
                a // Fixed
              ) => (
                <option key={a.award_id} value={a.award_id}>
                  {a.name}
                </option>
              )
            )}
          </select>
          <input
            type="date"
            {...register(`emp_award.${index}.achieve_date`)}
            className="flex-1 p-2 border rounded mr-2"
          />
          <input
            type="date"
            {...register(`emp_award.${index}.expire_date`)}
            className="flex-1 p-2 border rounded mr-2"
          />
          <textarea
            {...register(`emp_award.${index}.description`)}
            className="flex-1 p-2 border rounded mr-2"
            rows={1}
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

export default EmpAwardForm;
