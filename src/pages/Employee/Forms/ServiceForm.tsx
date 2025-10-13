import { useFormContext } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";

const ServiceForm = ({ empNo }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [regiments, setRegiments] = useState([]);
  const [units, setUnits] = useState([]);
  const [ranks, setRanks] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch master data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [regRes, unitRes, rankRes, appRes] = await Promise.all([
          axios.get("http://localhost:3000/master/regiment"),
          axios.get("http://localhost:3000/master/unit"),
          axios.get("http://localhost:3000/master/rank"),
          axios.get("http://localhost:3000/master/appointment"),
        ]);
        setRegiments(regRes.data || []);
        setUnits(unitRes.data || []);
        setRanks(rankRes.data || []);
        setAppointments(appRes.data || []);
      } catch (err) {
        console.error("Failed to fetch master data for Service:", err);
        setError("Failed to load dropdown options. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading Service data...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <input type="hidden" {...register("service.emp_no")} value={empNo} />{" "}
      {/* Auto-filled */}
      {/* Service Base */}
      <div className="p-4 bg-gray-50 rounded">
        <h4 className="font-semibold mb-2">Service Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Service ID (Manual)
            </label>
            <input
              {...register("service.service_id", {
                required: "Service ID is required",
                validate: (v) => v.length === 10 || "Must be 10 characters",
              })}
              className={`w-full p-2 border rounded ${
                errors.service?.service_id
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="e.g., SRV001"
              maxLength={10}
            />
            {errors.service?.service_id && (
              <p className="text-red-500 text-xs mt-1">
                {errors.service.service_id.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Service No</label>
            <input
              {...register("service.service_no", {
                required: "Service No is required",
                validate: (v) => v.length <= 10 || "Must be 10 characters",
              })}
              className={`w-full p-2 border rounded ${
                errors.service?.service_no
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              maxLength={10}
            />
            {errors.service?.service_no && (
              <p className="text-red-500 text-xs mt-1">
                {errors.service.service_no.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Regiment</label>
            <select
              {...register("service.regiment_id", {
                required: "Regiment is required",
              })}
              className={`w-full p-2 border rounded ${
                errors.service?.regiment_id
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">Select Regiment</option>
              {regiments.map((reg) => (
                <option key={reg.regiment_id} value={reg.regiment_id}>
                  {reg.name}
                </option>
              ))}
            </select>
            {errors.service?.regiment_id && (
              <p className="text-red-500 text-xs mt-1">
                {errors.service.regiment_id.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Unit</label>
            <select
              {...register("service.unit_id", { required: "Unit is required" })}
              className={`w-full p-2 border rounded ${
                errors.service?.unit_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Unit</option>
              {units.map((unit) => (
                <option key={unit.unit_id} value={unit.unit_id}>
                  {unit.name}
                </option>
              ))}
            </select>
            {errors.service?.unit_id && (
              <p className="text-red-500 text-xs mt-1">
                {errors.service.unit_id.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Rank</label>
            <select
              {...register("service.rank_id", { required: "Rank is required" })}
              className={`w-full p-2 border rounded ${
                errors.service?.rank_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Rank</option>
              {ranks.map((rank) => (
                <option key={rank.rank_id} value={rank.rank_id}>
                  {rank.r_name}
                </option>
              ))}
            </select>
            {errors.service?.rank_id && (
              <p className="text-red-500 text-xs mt-1">
                {errors.service.rank_id.message}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Promotion Sub-Section */}
      <div className="p-4 bg-blue-50 rounded">
        <h4 className="font-semibold mb-2">Promotion Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Promotion ID (Manual)
            </label>
            <input
              {...register("promotion.promotion_id", {
                required: "Promotion ID is required",
                validate: (v) => v.length === 10 || "Must be 10 characters",
              })}
              className={`w-full p-2 border rounded ${
                errors.promotion?.promotion_id
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="e.g., PROM001"
              maxLength={10}
            />
            {errors.promotion?.promotion_id && (
              <p className="text-red-500 text-xs mt-1">
                {errors.promotion.promotion_id.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rank</label>
            <select
              {...register("promotion.rank_id", {
                required: "Rank is required",
              })}
              className={`w-full p-2 border rounded ${
                errors.promotion?.rank_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Rank</option>
              {ranks.map((rank) => (
                <option key={rank.rank_id} value={rank.rank_id}>
                  {rank.r_name}
                </option>
              ))}
            </select>
            {errors.promotion?.rank_id && (
              <p className="text-red-500 text-xs mt-1">
                {errors.promotion.rank_id.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Appointment
            </label>
            <select
              {...register("promotion.appointment_id", {
                required: "Appointment is required",
              })}
              className={`w-full p-2 border rounded ${
                errors.promotion?.appointment_id
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">Select Appointment</option>
              {appointments.map((appt) => (
                <option key={appt.appointment_id} value={appt.appointment_id}>
                  {appt.name}
                </option>
              ))}
            </select>
            {errors.promotion?.appointment_id && (
              <p className="text-red-500 text-xs mt-1">
                {errors.promotion.appointment_id.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Promotion Date
            </label>
            <input
              type="date"
              {...register("promotion.a_date", {
                required: "Promotion date is required",
              })}
              className={`w-full p-2 border rounded ${
                errors.promotion?.a_date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.promotion?.a_date && (
              <p className="text-red-500 text-xs mt-1">
                {errors.promotion.a_date.message}
              </p>
            )}
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium mb-1">Reason</label>
            <textarea
              {...register("promotion.reason", {
                required: "Reason is required",
                maxLength: { value: 50, message: "Max 50 characters" },
              })}
              className={`w-full p-2 border rounded ${
                errors.promotion?.reason ? "border-red-500" : "border-gray-300"
              }`}
              rows={2}
              maxLength={50}
            />
            {errors.promotion?.reason && (
              <p className="text-red-500 text-xs mt-1">
                {errors.promotion.reason.message}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Posting Sub-Section */}
      <div className="p-4 bg-green-50 rounded">
        <h4 className="font-semibold mb-2">Posting Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Posting ID (Manual)
            </label>
            <input
              {...register("posting.posting_id", {
                required: "Posting ID is required",
                validate: (v) => v.length === 10 || "Must be 10 characters",
              })}
              className={`w-full p-2 border rounded ${
                errors.posting?.posting_id
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="e.g., POST001"
              maxLength={10}
            />
            {errors.posting?.posting_id && (
              <p className="text-red-500 text-xs mt-1">
                {errors.posting.posting_id.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Unit</label>
            <select
              {...register("posting.unit_id", { required: "Unit is required" })}
              className={`w-full p-2 border rounded ${
                errors.posting?.unit_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Unit</option>
              {units.map((unit) => (
                <option key={unit.unit_id} value={unit.unit_id}>
                  {unit.name}
                </option>
              ))}
            </select>
            {errors.posting?.unit_id && (
              <p className="text-red-500 text-xs mt-1">
                {errors.posting.unit_id.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Rank</label>
            <select
              {...register("posting.rank_id", { required: "Rank is required" })}
              className={`w-full p-2 border rounded ${
                errors.posting?.rank_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Rank</option>
              {ranks.map((rank) => (
                <option key={rank.rank_id} value={rank.rank_id}>
                  {rank.r_name}
                </option>
              ))}
            </select>
            {errors.posting?.rank_id && (
              <p className="text-red-500 text-xs mt-1">
                {errors.posting.rank_id.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Regiment</label>
            <select
              {...register("posting.regiment_id", {
                required: "Regiment is required",
              })}
              className={`w-full p-2 border rounded ${
                errors.posting?.regiment_id
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">Select Regiment</option>
              {regiments.map((reg) => (
                <option key={reg.regiment_id} value={reg.regiment_id}>
                  {reg.name}
                </option>
              ))}
            </select>
            {errors.posting?.regiment_id && (
              <p className="text-red-500 text-xs mt-1">
                {errors.posting.regiment_id.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Appointment
            </label>
            <select
              {...register("posting.appointment_id", {
                required: "Appointment is required",
              })}
              className={`w-full p-2 border rounded ${
                errors.posting?.appointment_id
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">Select Appointment</option>
              {appointments.map((appt) => (
                <option key={appt.appointment_id} value={appt.appointment_id}>
                  {appt.name}
                </option>
              ))}
            </select>
            {errors.posting?.appointment_id && (
              <p className="text-red-500 text-xs mt-1">
                {errors.posting.appointment_id.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Posting Date
            </label>
            <input
              type="date"
              {...register("posting.p_date", {
                required: "Posting date is required",
              })}
              className={`w-full p-2 border rounded ${
                errors.posting?.p_date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.posting?.p_date && (
              <p className="text-red-500 text-xs mt-1">
                {errors.posting.p_date.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
