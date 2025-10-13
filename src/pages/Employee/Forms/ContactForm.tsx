import { useFormContext } from "react-hook-form";

const ContactForm = ({ empNo }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">EMP No</label>
        <input
          {...register("contact.emp_no")}
          defaultValue={empNo}
          readOnly
          className="w-full p-2 border rounded border-gray-300 bg-gray-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Contact ID (Manual)
        </label>
        <input
          {...register("contact.contact_id", {
            required: "Contact ID is required",
          })}
          className={`w-full p-2 border rounded ${
            errors.contact?.contact_id ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="e.g., CNT001"
        />
        {errors['contact.contact_id'] && (
          <p className="text-red-500 text-xs mt-1">
            {errors['contact.contact_id'].message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Telephone</label>
        <input
          {...register("contact.telephone", {
            required: "Telephone is required",
          })}
          className={`w-full p-2 border rounded ${
            errors.contact?.telephone ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.contact?.telephone && (
          <p className="text-red-500 text-xs mt-1">
            {errors.contact.telephone.message}
          </p>
        )}
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
          }`}
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
