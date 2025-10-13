import { useFormContext } from "react-hook-form";

const EmployeeBasicForm = ({ empNo }) => {
  // Standardized prop to empNo
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">EMP No</label>
        <input
          {...register("emp_no", {
            required: "EMP No is required",
            validate: (v) => v.length <= 10 || "Must be 10 characters",
          })}
          value={empNo}
          className={`w-full p-2 border rounded ${
            errors.emp_no ? "border-red-500" : "border-gray-300"
          }`}
          //readOnly // Auto-filled
        />
        {errors.emp_no && (
          <p className="text-red-500 text-xs mt-1">{errors.emp_no.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">NIC No</label>
        <input
          {...register("nic_no", {
            required: "NIC No is required",
            validate: (v) => v.length === 12 || "Must be 12 characters",
          })}
          className={`w-full p-2 border rounded ${
            errors.nic_no ? "border-red-500" : "border-gray-300"
          }`}
          maxLength={12}
        />
        {errors.nic_no && (
          <p className="text-red-500 text-xs mt-1">{errors.nic_no.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Passport No</label>
        <input
          {...register("passport_no", {
            maxLength: { value: 20, message: "Max 20 characters" },
          })}
          className="w-full p-2 border rounded border-gray-300"
          maxLength={20}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">First Name</label>
        <input
          {...register("first_name", {
            required: "First name is required",
            maxLength: { value: 20, message: "Max 20 characters" },
          })}
          className={`w-full p-2 border rounded ${
            errors.first_name ? "border-red-500" : "border-gray-300"
          }`}
          maxLength={20}
        />
        {errors.first_name && (
          <p className="text-red-500 text-xs mt-1">
            {errors.first_name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Last Name</label>
        <input
          {...register("last_name", {
            required: "Last name is required",
            maxLength: { value: 20, message: "Max 20 characters" },
          })}
          className={`w-full p-2 border rounded ${
            errors.last_name ? "border-red-500" : "border-gray-300"
          }`}
          maxLength={20}
        />
        {errors.last_name && (
          <p className="text-red-500 text-xs mt-1">
            {errors.last_name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Date of Birth</label>
        <input
          type="date"
          {...register("dob", { required: "Date of birth is required" })}
          className={`w-full p-2 border rounded ${
            errors.dob ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.dob && (
          <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Gender</label>
        <select
          {...register("gender", {
            required: "Gender is required",
            validate: (v) => ["M", "F"].includes(v) || "Must be M or F",
          })}
          className={`w-full p-2 border rounded ${
            errors.gender ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Religion</label>
        <input
          {...register("religion", {
            maxLength: { value: 20, message: "Max 20 characters" },
          })}
          className="w-full p-2 border rounded border-gray-300"
          maxLength={20}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Nationality</label>
        <input
          {...register("nationality", {
            maxLength: { value: 20, message: "Max 20 characters" },
          })}
          defaultValue="Sri Lankan"
          className="w-full p-2 border rounded border-gray-300"
          maxLength={20}
        />
      </div>

      {/* Photo Upload (BLOB handling) */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">Photo</label>
        <input
          type="file"
          accept="image/*"
          {...register("photo")}
          className="w-full p-2 border rounded border-gray-300"
        />
        {/* Backend will handle base64 conversion if needed */}
      </div>
    </div>
  );
};

export default EmployeeBasicForm;