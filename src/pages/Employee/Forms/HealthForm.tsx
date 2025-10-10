import React from "react";
import { useFormContext } from "react-hook-form";

const HealthForm = ({ empNo, masterData }) => {
  // Fixed props
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="space-y-6">
      <input type="hidden" {...register("health.emp_no")} value={empNo} />{" "}
      {/* Fixed value */}
      {/* Health Base */}
      <div className="p-4 bg-gray-50 rounded">
        <h4 className="font-semibold mb-2">Health Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Blood Group</label>
            <input
              {...register("health.blood_group")}
              className={`w-full p-2 border rounded ${
                errors.health?.blood_group ? "border-red-500" : ""
              }`}
            />
            {errors.health?.blood_group && (
              <p className="text-red-500 text-xs">
                {errors.health.blood_group.message}
              </p>
            )}
          </div>
          <div>
            <label>Height (cm)</label>
            <input
              type="number"
              {...register("health.height")}
              className={`w-full p-2 border rounded ${
                errors.health?.height ? "border-red-500" : ""
              }`}
            />
            {errors.health?.height && (
              <p className="text-red-500 text-xs">
                {errors.health.height.message}
              </p>
            )}
          </div>
          <div>
            <label>Weight (kg)</label>
            <input
              type="number"
              {...register("health.weight")}
              className={`w-full p-2 border rounded ${
                errors.health?.weight ? "border-red-500" : ""
              }`}
            />
            {errors.health?.weight && (
              <p className="text-red-500 text-xs">
                {errors.health.weight.message}
              </p>
            )}
          </div>
          <div>
            <label>BMI</label>
            <input
              type="number"
              {...register("health.bmi")}
              className={`w-full p-2 border rounded ${
                errors.health?.bmi ? "border-red-500" : ""
              }`}
            />
            {errors.health?.bmi && (
              <p className="text-red-500 text-xs">
                {errors.health.bmi.message}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <label>Fitness</label>
            <select
              {...register("health.fitness_id")}
              className={`w-full p-2 border rounded ${
                errors.health?.fitness_id ? "border-red-500" : ""
              }`}
            >
              <option value="">Select</option>
              {masterData.fitness.map(
                (
                  f // Fixed
                ) => (
                  <option key={f.fitness_id} value={f.fitness_id}>
                    {f.f_name}
                  </option>
                )
              )}
            </select>
            {errors.health?.fitness_id && (
              <p className="text-red-500 text-xs">
                {errors.health.fitness_id.message}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Medical History Sub-Section */}
      <div className="p-4 bg-blue-50 rounded">
        <h4 className="font-semibold mb-2">Medical History</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>Check Date</label>
            <input
              type="date"
              {...register("medical_history.check_date")}
              className={`w-full p-2 border rounded ${
                errors.medical_history?.check_date ? "border-red-500" : ""
              }`}
            />
            {errors.medical_history?.check_date && (
              <p className="text-red-500 text-xs">
                {errors.medical_history.check_date.message}
              </p>
            )}
          </div>
          <div>
            <label>Expire Date</label>
            <input
              type="date"
              {...register("medical_history.expire_date")}
              className={`w-full p-2 border rounded ${
                errors.medical_history?.expire_date ? "border-red-500" : ""
              }`}
            />
            {errors.medical_history?.expire_date && (
              <p className="text-red-500 text-xs">
                {errors.medical_history.expire_date.message}
              </p>
            )}
          </div>
          <div>
            <label>Status</label>
            <input
              {...register("medical_history.status")}
              className={`w-full p-2 border rounded ${
                errors.medical_history?.status ? "border-red-500" : ""
              }`}
            />
            {errors.medical_history?.status && (
              <p className="text-red-500 text-xs">
                {errors.medical_history.status.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthForm;
