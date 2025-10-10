import React from "react";
import { useFormContext } from "react-hook-form";

const SecurityForm = ({ empNo, masterData }) => {
  // Fixed props
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="hidden" {...register("security.emp_no")} value={empNo} />{" "}
      {/* Fixed value */}
      <div>
        <label className="block text-sm font-medium mb-1">Security Level</label>
        <input
          {...register("security.s_level")}
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
        <label>Issue Date</label>
        <input
          type="date"
          {...register("security.issue_date")}
          className={`w-full p-2 border rounded ${
            errors.security?.issue_date ? "border-red-500" : ""
          }`}
        />
        {errors.security?.issue_date && (
          <p className="text-red-500 text-xs">
            {errors.security.issue_date.message}
          </p>
        )}
      </div>
      <div>
        <label>Expire Date</label>
        <input
          type="date"
          {...register("security.expire_date")}
          className={`w-full p-2 border rounded ${
            errors.security?.expire_date ? "border-red-500" : ""
          }`}
        />
        {errors.security?.expire_date && (
          <p className="text-red-500 text-xs">
            {errors.security.expire_date.message}
          </p>
        )}
      </div>
      <div className="md:col-span-2">
        <label>Clearance</label>
        <select
          {...register("security.clearance_id")}
          className={`w-full p-2 border rounded ${
            errors.security?.clearance_id ? "border-red-500" : ""
          }`}
        >
          <option value="">Select</option>
          {masterData.securityClearances.map(
            (
              c // Fixed
            ) => (
              <option key={c.clearance_id} value={c.clearance_id}>
                {c.sc_level}
              </option>
            )
          )}
        </select>
        {errors.security?.clearance_id && (
          <p className="text-red-500 text-xs">
            {errors.security.clearance_id.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SecurityForm;
