import React from "react";
import { useFormContext } from "react-hook-form";

const ServiceForm = ({ empNo, masterData }) => {
  // Added masterData prop
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="space-y-6">
      <input type="hidden" {...register("service.emp_no")} value={empNo} />{" "}
      {/* Fixed value */}
      {/* Service Base */}
      <div className="p-4 bg-gray-50 rounded">
        <h4 className="font-semibold mb-2">Service Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Service No</label>
            <input
              {...register("service.service_no")}
              className="w-full p-2 border rounded border-gray-300"
            />
            {errors.service?.service_no && (
              <p className="text-red-500 text-xs">
                {errors.service.service_no.message}
              </p>
            )}
          </div>
          <div>
            <label>Regiment</label>
            <select
              {...register("service.regiment_id")}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              {masterData.regiments.map(
                (
                  r // Now defined
                ) => (
                  <option key={r.regiment_id} value={r.regiment_id}>
                    {r.name}
                  </option>
                )
              )}
            </select>
          </div>
          <div>
            <label>Unit</label>
            <select
              {...register("service.unit_id")}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              {masterData.units.map((u) => (
                <option key={u.unit_id} value={u.unit_id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Rank</label>
            <select
              {...register("service.rank_id")}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              {masterData.ranks.map((rk) => (
                <option key={rk.rank_id} value={rk.rank_id}>
                  {rk.r_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Promotion Sub-Section (unchanged, now masterData defined) */}
      <div className="p-4 bg-blue-50 rounded">
        <h4 className="font-semibold mb-2">Promotion Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>Rank</label>
            <select
              {...register("promotion.rank_id")}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              {masterData.ranks.map((rk) => (
                <option key={rk.rank_id} value={rk.rank_id}>
                  {rk.r_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Appointment</label>
            <select
              {...register("promotion.appointment_id")}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              {masterData.appointments.map((a) => (
                <option key={a.appointment_id} value={a.appointment_id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Promotion Date</label>
            <input
              type="date"
              {...register("promotion.a_date")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="md:col-span-3">
            <label>Reason</label>
            <textarea
              {...register("promotion.reason")}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>
      {/* Posting Sub-Section (similar) */}
      <div className="p-4 bg-green-50 rounded">
        <h4 className="font-semibold mb-2">Posting Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>Unit</label>
            <select
              {...register("posting.unit_id")}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              {masterData.units.map((u) => (
                <option key={u.unit_id} value={u.unit_id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Rank</label>
            <select
              {...register("posting.rank_id")}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              {masterData.ranks.map((rk) => (
                <option key={rk.rank_id} value={rk.rank_id}>
                  {rk.r_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Regiment</label>
            <select
              {...register("posting.regiment_id")}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              {masterData.regiments.map((r) => (
                <option key={r.regiment_id} value={r.regiment_id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Appointment</label>
            <select
              {...register("posting.appointment_id")}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              {masterData.appointments.map((a) => (
                <option key={a.appointment_id} value={a.appointment_id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Posting Date</label>
            <input
              type="date"
              {...register("posting.p_date")}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
