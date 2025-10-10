import React, { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

// Hardcoded options for Mission dropdown (later fetch from master API)
const mockMissions = [
  { id: "MIS001", name: "Mission 1", location: "Loc A", type: "Type X" },
  { id: "MIS002", name: "Mission 2", location: "Loc B", type: "Type Y" },
];

const EmpMissionForm = ({ empNo }) => {
  const { control, register } = useFormContext();
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
    } else {
      alert("Please fill all fields to add a record.");
    }
  };

  return (
    <div className="space-y-4">
      {/* Add New Row Form */}
      <div className="p-4 bg-gray-50 rounded">
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
            {mockMissions.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.location}, {m.type})
              </option>
            ))}
          </select>
          <input
            type="date"
            value={newMission.start_date}
            onChange={(e) =>
              setNewMission({ ...newMission, start_date: e.target.value })
            }
            className="p-2 border rounded"
          />
          <input
            type="date"
            value={newMission.expire_date}
            onChange={(e) =>
              setNewMission({ ...newMission, expire_date: e.target.value })
            }
            className="p-2 border rounded"
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
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Mission
        </button>
      </div>

      {/* Existing Rows */}
      <div>
        <h4 className="font-semibold mb-2">Missions</h4>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center p-2 border rounded mb-2 bg-white"
          >
            <select
              {...register(`emp_mission.${index}.mission_id`, {
                required: "Mission ID required",
              })}
              className="flex-1 p-2 border rounded mr-2"
            >
              <option value="">Select Mission</option>
              {mockMissions.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              {...register(`emp_mission.${index}.start_date`, {
                required: "Start Date required",
              })}
              className="flex-1 p-2 border rounded mr-2"
            />
            <input
              type="date"
              {...register(`emp_mission.${index}.expire_date`, {
                required: "Expire Date required",
              })}
              className="flex-1 p-2 border rounded mr-2"
            />
            <input
              {...register(`emp_mission.${index}.role`, {
                required: "Role required",
                maxLength: { value: 10, message: "Max 10 chars" },
              })}
              className="flex-1 p-2 border rounded mr-2"
              maxLength={10}
            />
            <input
              type="hidden"
              {...register(`emp_mission.${index}.emp_no`)}
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
          <p className="text-gray-500">No missions added yet.</p>
        )}
      </div>
    </div>
  );
};

export default EmpMissionForm;
