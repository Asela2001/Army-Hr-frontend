import React, { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const EmpMissionForm = ({ empNo, masterData }) => {
  // Fixed props
  const { control, register } = useFormContext(); // Added register
  const { fields, append, remove } = useFieldArray({
    control,
    name: "emp_mission",
  });
  const [newMission, setNewMission] = useState({
    mission_id: "",
    start_date: "",
    expire_date: "",
    role: "",
  });

  const addMission = () => {
    if (
      newMission.mission_id &&
      newMission.start_date &&
      newMission.expire_date &&
      newMission.role
    ) {
      append({ ...newMission, emp_no: empNo });
      setNewMission({
        mission_id: "",
        start_date: "",
        expire_date: "",
        role: "",
      });
    }
  };

  return (
    <div>
      {/* Add New Row Form */}
      <div className="mb-4 p-4 bg-gray-50 rounded">
        <h4 className="font-semibold mb-2">Add New Mission</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={newMission.mission_id}
            onChange={(e) =>
              setNewMission({ ...newMission, mission_id: e.target.value })
            }
            className="p-2 border rounded"
          >
            <option value="">Select Mission</option>
            {masterData.missions.map(
              (
                m // Fixed
              ) => (
                <option key={m.mission_id} value={m.mission_id}>
                  {m.name} ({m.location}, {m.type})
                </option>
              )
            )}
          </select>
          <input
            type="date"
            value={newMission.start_date}
            onChange={(e) =>
              setNewMission({ ...newMission, start_date: e.target.value })
            }
            className="p-2 border rounded"
            placeholder="Start Date"
          />
          <input
            type="date"
            value={newMission.expire_date}
            onChange={(e) =>
              setNewMission({ ...newMission, expire_date: e.target.value })
            }
            className="p-2 border rounded"
            placeholder="Expire Date"
          />
          <input
            value={newMission.role}
            onChange={(e) =>
              setNewMission({ ...newMission, role: e.target.value })
            }
            className="p-2 border rounded col-span-2"
            placeholder="Role"
            maxLength={10}
          />
        </div>
        <button
          type="button"
          onClick={addMission}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Mission
        </button>
      </div>

      {/* Existing Rows */}
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex items-center p-2 border rounded mb-2"
        >
          <select
            {...register(`emp_mission.${index}.mission_id`)}
            className="flex-1 p-2 border rounded mr-2"
          >
            {" "}
            {/* register defined */}
            <option value="">Select</option>
            {masterData.missions.map(
              (
                m // Fixed
              ) => (
                <option key={m.mission_id} value={m.mission_id}>
                  {m.name}
                </option>
              )
            )}
          </select>
          <input
            type="date"
            {...register(`emp_mission.${index}.start_date`)}
            className="flex-1 p-2 border rounded mr-2"
          />
          <input
            type="date"
            {...register(`emp_mission.${index}.expire_date`)}
            className="flex-1 p-2 border rounded mr-2"
          />
          <input
            {...register(`emp_mission.${index}.role`)}
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

export default EmpMissionForm;
