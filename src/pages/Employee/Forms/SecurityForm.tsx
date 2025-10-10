import React from "react";
import { useFormContext } from "react-hook-form";

// Hardcoded options for Clearance dropdown (later fetch from master API)
const mockClearances = [
  { id: "SEC001", level: "Level 1" },
  { id: "SEC002", level: "Level 2" },
];

const SecurityForm = ({ empNo }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="hidden" {...register("security.emp_no")} value={empNo} />{" "}
      {/* Auto-filled */}
      <div>
        <label className="block text-sm font-medium mb-1">Security Level</label>
        <input
          {...register("security.s_level", {
            required: "Security Level is required",
          })}
          className={`w-full p-2 border rounded ${
            errors.security?.s_level ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.security?.s_level && (
          <p className="text-red-500 text-xs mt-1">
            {errors.security.s_level.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Issue Date</label>
        <input
          type="date"
          {...register("security.issue_date", {
            required: "Issue Date is required",
          })}
          className={`w-full p-2 border rounded ${
            errors.security?.issue_date ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.security?.issue_date && (
          <p className="text-red-500 text-xs mt-1">
            {errors.security.issue_date.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Expire Date</label>
        <input
          type="date"
          {...register("security.expire_date", {
            required: "Expire Date is required",
          })}
          className={`w-full p-2 border rounded ${
            errors.security?.expire_date ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.security?.expire_date && (
          <p className="text-red-500 text-xs mt-1">
            {errors.security.expire_date.message}
          </p>
        )}
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">Clearance</label>
        <select
          {...register("security.clearance_id", {
            required: "Clearance is required",
          })}
          className={`w-full p-2 border rounded ${
            errors.security?.clearance_id ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select Clearance</option>
          {mockClearances.map((clearance) => (
            <option key={clearance.id} value={clearance.id}>
              {clearance.level}
            </option>
          ))}
        </select>
        {errors.security?.clearance_id && (
          <p className="text-red-500 text-xs mt-1">
            {errors.security.clearance_id.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SecurityForm;
