import { useState, useEffect  } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import axios from "axios";

const EmpAwardForm = ({ empNo }) => {
  const { control, register } = useFormContext();
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
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch master data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const awardRes = await axios.get("http://localhost:3000/master/award");
        setAwards(awardRes.data || []);
      } catch (err) {
        console.error("Failed to fetch master data for Emp Award:", err);
        setError("Failed to load award options. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addAward = () => {
    if (
      newAward.award_id &&
      newAward.achieve_date &&
      newAward.expire_date &&
      newAward.description
    ) {
      append({ ...newAward, emp_no: empNo });
      setNewAward({
        award_id: "",
        achieve_date: "",
        expire_date: "",
        description: "",
      });
    } else {
      alert("Please fill all fields to add a record.");
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading Award data...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="space-y-4">
      {/* Add New Row Form */}
      <div className="p-4 bg-gray-50 rounded">
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
            {awards.map((a) => (
              <option key={a.award_id} value={a.award_id}>
                {a.name} ({a.type})
              </option>
            ))}
          </select>
          <input
            type="date"
            value={newAward.achieve_date}
            onChange={(e) =>
              setNewAward({ ...newAward, achieve_date: e.target.value })
            }
            className="p-2 border rounded"
          />
          <input
            type="date"
            value={newAward.expire_date}
            onChange={(e) =>
              setNewAward({ ...newAward, expire_date: e.target.value })
            }
            className="p-2 border rounded"
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
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Award
        </button>
      </div>

      {/* Existing Rows */}
      <div>
        <h4 className="font-semibold mb-2">Awards</h4>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center p-2 border rounded mb-2 bg-white"
          >
            <select
              {...register(`emp_award.${index}.award_id`, {
                required: "Award ID required",
              })}
              className="flex-1 p-2 border rounded mr-2"
            >
              <option value="">Select Award</option>
              {awards.map((a) => (
                <option key={a.award_id} value={a.award_id}>
                  {a.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              {...register(`emp_award.${index}.achieve_date`, {
                required: "Achieve Date required",
              })}
              className="flex-1 p-2 border rounded mr-2"
            />
            <input
              type="date"
              {...register(`emp_award.${index}.expire_date`, {
                required: "Expire Date required",
              })}
              className="flex-1 p-2 border rounded mr-2"
            />
            <textarea
              {...register(`emp_award.${index}.description`, {
                required: "Description required",
                maxLength: { value: 50, message: "Max 50 chars" },
              })}
              className="flex-1 p-2 border rounded mr-2"
              rows={1}
              maxLength={50}
            />
            <input
              type="hidden"
              {...register(`emp_award.${index}.emp_no`)}
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
          <p className="text-gray-500">No awards added yet.</p>
        )}
      </div>
    </div>
  );
};

export default EmpAwardForm;
