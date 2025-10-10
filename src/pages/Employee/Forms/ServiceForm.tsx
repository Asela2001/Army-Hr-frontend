import React from "react";
import { useFormContext } from "react-hook-form";

// Hardcoded options for dropdowns (later fetch from master API)
const mockRegiments = [
  { id: "REG001", name: "Regiment 1" },
  { id: "REG002", name: "Regiment 2" },
];
const mockUnits = [
  { id: "UNIT001", name: "Unit 1" },
  { id: "UNIT002", name: "Unit 2" },
];
const mockRanks = [
  { id: "RANK001", name: "Rank 1" },
  { id: "RANK002", name: "Rank 2" },
];
const mockAppointments = [
  { id: "APP001", name: "Appointment 1" },
  { id: "APP002", name: "Appointment 2" },
];

const ServiceForm = ({ empNo }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      <input type="hidden" {...register("service.emp_no")} value={empNo} />{" "}
      {/* Auto-filled */}
      {/* Service Base */}
      <div className="p-4 bg-gray-50 rounded">
        <h4 className="font-semibold mb-2">Service Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Service No</label>
            <input
              {...register("service.service_no", {
                required: "Service No is required",
                validate: (v) => v.length === 10 || "Must be 10 characters",
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
              {mockRegiments.map((reg) => (
                <option key={reg.id} value={reg.id}>
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
              {mockUnits.map((unit) => (
                <option key={unit.id} value={unit.id}>
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
              {mockRanks.map((rank) => (
                <option key={rank.id} value={rank.id}>
                  {rank.name}
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
              {mockRanks.map((rank) => (
                <option key={rank.id} value={rank.id}>
                  {rank.name}
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
              {mockAppointments.map((appt) => (
                <option key={appt.id} value={appt.id}>
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
            <label className="block text-sm font-medium mb-1">Unit</label>
            <select
              {...register("posting.unit_id", { required: "Unit is required" })}
              className={`w-full p-2 border rounded ${
                errors.posting?.unit_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Unit</option>
              {mockUnits.map((unit) => (
                <option key={unit.id} value={unit.id}>
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
              {mockRanks.map((rank) => (
                <option key={rank.id} value={rank.id}>
                  {rank.name}
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
              {mockRegiments.map((reg) => (
                <option key={reg.id} value={reg.id}>
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
              {mockAppointments.map((appt) => (
                <option key={appt.id} value={appt.id}>
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
