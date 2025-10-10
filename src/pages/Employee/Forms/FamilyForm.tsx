import React from "react";
import { useFormContext } from "react-hook-form";

const FamilyForm = ({ empNo }) => {
  // Fixed prop
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const maritalStatus = watch("marital_status");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="hidden" {...register("emp_no")} value={empNo} />{" "}
      {/* Fixed value */}
      <div>
        <label className="block text-sm font-medium mb-1">Marital Status</label>
        <select
          {...register("marital_status")}
          className={`w-full p-2 border rounded ${
            errors.marital_status ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorce">Divorce</option>
        </select>
        {errors.marital_status && (
          <p className="text-red-500 text-xs mt-1">
            {errors.marital_status.message}
          </p>
        )}
      </div>
      {maritalStatus === "Married" && (
        <div>
          <label className="block text-sm font-medium mb-1">Spouse Name</label>
          <input
            {...register("spouse_name")}
            className={`w-full p-2 border rounded ${
              errors.spouse_name ? "border-red-500" : "border-gray-300"
            }`}
            maxLength={20}
          />
          {errors.spouse_name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.spouse_name.message}
            </p>
          )}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium mb-1">
          Number of Children
        </label>
        <input
          type="number"
          {...register("number_of_children")}
          min={0}
          max={99}
          className="w-full p-2 border rounded border-gray-300"
        />
      </div>
    </div>
  );
};

export default FamilyForm;
