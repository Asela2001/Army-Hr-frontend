import { useFormContext } from 'react-hook-form';

const EmployeeBasicForm = ({emp_no}) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">EMP No</label>
        <input
          {...register("emp_no")}
          value={emp_no}
          className={`w-full p-2 border rounded ${
            errors.emp_no ? "border-red-500" : "border-gray-300"
          }`}
          readOnly // Auto-filled
        />
        {errors.emp_no && (
          <p className="text-red-500 text-xs mt-1">{errors.emp_no.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">NIC No</label>
        <input
          {...register("nic_no")}
          className={`w-full p-2 border rounded ${
            errors.nic_no ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.nic_no && (
          <p className="text-red-500 text-xs mt-1">{errors.nic_no.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">First Name</label>
        <input
          {...register("first_name")}
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
          {...register("last_name")}
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
          {...register("dob")}
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
          {...register("gender")}
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
          {...register("religion")}
          className="w-full p-2 border rounded border-gray-300"
          maxLength={20}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Nationality</label>
        <input
          {...register("nationality")}
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

export default EmployeeBasicForm
