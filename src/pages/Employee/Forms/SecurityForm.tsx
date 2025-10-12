import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import axios from "axios";

const SecurityForm = ({ empNo }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [clearances, setClearances] = useState([]); // State for dynamic data
  const [loading, setLoading] = useState(true); // Loading state
  const [fetchError, setFetchError] = useState(null); // Error state

  // Fetch dynamic clearances from backend
  useEffect(() => {
    const fetchClearances = async () => {
      try {
        setLoading(true);
        setFetchError(null);
        const response = await axios.get(
          "http://localhost:3000/master/security-clearance"
        );
        setClearances(response.data || []); // Assume backend returns array of { clearance_id, sc_level, ... }
      } catch (error) {
        console.error("Failed to fetch clearances:", error);
        setFetchError("Failed to load clearances. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchClearances();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-4">Loading Security Clearances...</div>
    );
  }

  if (fetchError) {
    return <div className="text-red-500 text-center p-4">{fetchError}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="hidden" {...register("security.emp_no")} value={empNo} />
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
          {clearances.map((clearance) => (
            <option key={clearance.clearance_id} value={clearance.clearance_id}>
              {clearance.sc_level}
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
