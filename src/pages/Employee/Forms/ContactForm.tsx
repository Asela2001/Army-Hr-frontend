import React from "react";
import { useFormContext } from "react-hook-form";

const ContactForm = ({ empNo }) => {
  // Fixed prop name
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="hidden" {...register("contact.emp_no")} value={empNo} />{" "}
      {/* Fixed value */}
      <div>
        <label className="block text-sm font-medium mb-1">Telephone</label>
        <input
          {...register("contact.telephone")}
          className={`w-full p-2 border rounded ${
            errors.contact?.telephone ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.contact?.telephone && (
          <p className="text-red-500 text-xs mt-1">
            {errors.contact.telephone.message}
          </p>
        )}{" "}
        {/* Added error display */}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          {...register("contact.email")}
          className={`w-full p-2 border rounded ${
            errors.contact?.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.contact?.email && (
          <p className="text-red-500 text-xs mt-1">
            {errors.contact.email.message}
          </p>
        )}
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">Address</label>
        <textarea
          {...register("contact.address")}
          className={`w-full p-2 border rounded ${
            errors.contact?.address ? "border-red-500" : "border-gray-300"
          }`} // Added error class
          rows={3}
        />
        {errors.contact?.address && (
          <p className="text-red-500 text-xs mt-1">
            {errors.contact.address.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
