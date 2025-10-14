import { useFormContext } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";

const HealthForm = ({ empNo }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // State for fetched data
  const [fitness, setFitness] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch master data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fitnessRes = await axios.get(
          "http://localhost:3000/master/fitness"
        );
        setFitness(fitnessRes.data || []);
      } catch (err) {
        console.error("Failed to fetch master data for Health:", err);
        setError("Failed to load fitness options. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading Health data...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <input type="hidden" {...register("health.emp_no")} value={empNo} />{" "}
      {/* Auto-filled */}
      {/* Health Base */}
      <div className="p-4 bg-gray-50 rounded">
        <h4 className="font-semibold mb-2">Health Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Health ID (Manual)
            </label>
            <input
              {...register("health.health_id", {
                required: "Health ID is required",
                validate: (v) => v.length === 10 || "Must be 10 characters",
              })}
              className={`w-full p-2 border rounded ${
                errors.health?.health_id ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., HLTH001"
              maxLength={10}
            />
            {errors.health?.health_id && (
              <p className="text-red-500 text-xs mt-1">
                {errors.health.health_id.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Blood Group
            </label>
            <input
              {...register("health.blood_group", {
                required: "Blood Group is required",
              })}
              className={`w-full p-2 border rounded ${
                errors.health?.blood_group
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.health?.blood_group && (
              <p className="text-red-500 text-xs mt-1">
                {errors.health.blood_group.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              {...register("health.height", {
                required: "Height is required",
                min: { value: 0, message: "Must be positive" },
              })}
              className={`w-full p-2 border rounded ${
                errors.health?.height ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.health?.height && (
              <p className="text-red-500 text-xs mt-1">
                {errors.health.height.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              {...register("health.weight", {
                required: "Weight is required",
                min: { value: 0, message: "Must be positive" },
              })}
              className={`w-full p-2 border rounded ${
                errors.health?.weight ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.health?.weight && (
              <p className="text-red-500 text-xs mt-1">
                {errors.health.weight.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">BMI</label>
            <input
              type="number"
              step="0.01"
              {...register("health.bmi", { required: "BMI is required" })}
              className={`w-full p-2 border rounded ${
                errors.health?.bmi ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.health?.bmi && (
              <p className="text-red-500 text-xs mt-1">
                {errors.health.bmi.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Fitness Category
            </label>
            <select
              {...register("health.fitness_id", {
                required: "Fitness is required",
              })}
              className={`w-full p-2 border rounded ${
                errors.health?.fitness_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Fitness</option>
              {fitness.map((fit) => (
                <option key={fit.fitness_id} value={fit.fitness_id}>
                  {fit.f_name}
                </option>
              ))}
            </select>
            {errors.health?.fitness_id && (
              <p className="text-red-500 text-xs mt-1">
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
            <label className="block text-sm font-medium mb-1">
              MH ID (Manual)
            </label>
            <input
              {...register("medical_history.mh_id", {
                required: "MH ID is required",
                validate: (v) => v.length <= 10 || "Must be 10 characters",
              })}
              className={`w-full p-2 border rounded ${
                errors.medical_history?.mh_id
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="e.g., MH001"
              maxLength={10}
            />
            {errors.medical_history?.mh_id && (
              <p className="text-red-500 text-xs mt-1">
                {errors.medical_history.mh_id.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Check Date</label>
            <input
              type="date"
              {...register("medical_history.check_date", {
                required: "Check Date is required",
              })}
              className={`w-full p-2 border rounded ${
                errors.medical_history?.check_date
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.medical_history?.check_date && (
              <p className="text-red-500 text-xs mt-1">
                {errors.medical_history.check_date.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Expire Date
            </label>
            <input
              type="date"
              {...register("medical_history.expire_date", {
                required: "Expire Date is required",
              })}
              className={`w-full p-2 border rounded ${
                errors.medical_history?.expire_date
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.medical_history?.expire_date && (
              <p className="text-red-500 text-xs mt-1">
                {errors.medical_history.expire_date.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <input
              {...register("medical_history.status", {
                required: "Status is required",
                maxLength: { value: 10, message: "Max 10 characters" },
              })}
              className={`w-full p-2 border rounded ${
                errors.medical_history?.status
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              maxLength={10}
            />
            {errors.medical_history?.status && (
              <p className="text-red-500 text-xs mt-1">
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
