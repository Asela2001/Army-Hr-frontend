import React from "react";
import { useFormContext } from "react-hook-form";

// Hardcoded options for dropdowns (later fetch from master API)
const mockAllowances = [
  { id: "ALL001", name: "Allowance 1", amount: 5000 },
  { id: "ALL002", name: "Allowance 2", amount: 10000 },
];
const mockLoans = [
  { id: "LOAN001", name: "Loan 1", amount: 20000 },
  { id: "LOAN002", name: "Loan 2", amount: 50000 },
];

const PaymentForm = ({ empNo }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="hidden" {...register("payment.emp_no")} value={empNo} />{" "}
      {/* Auto-filled */}
      <div>
        <label className="block text-sm font-medium mb-1">Pay Code</label>
        <input
          {...register("payment.pay_code", {
            required: "Pay Code is required",
            validate: (v) => v.length === 10 || "Must be 10 characters",
          })}
          className={`w-full p-2 border rounded ${
            errors.payment?.pay_code ? "border-red-500" : "border-gray-300"
          }`}
          maxLength={10}
        />
        {errors.payment?.pay_code && (
          <p className="text-red-500 text-xs mt-1">
            {errors.payment.pay_code.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Basic Pay</label>
        <input
          type="number"
          step="0.01"
          {...register("payment.basic_pay", {
            required: "Basic Pay is required",
            min: { value: 0, message: "Must be positive" },
          })}
          className={`w-full p-2 border rounded ${
            errors.payment?.basic_pay ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.payment?.basic_pay && (
          <p className="text-red-500 text-xs mt-1">
            {errors.payment.basic_pay.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Bank Account No
        </label>
        <input
          type="number"
          {...register("payment.bank_acc_no", {
            required: "Bank ACC No is required",
          })}
          className={`w-full p-2 border rounded ${
            errors.payment?.bank_acc_no ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.payment?.bank_acc_no && (
          <p className="text-red-500 text-xs mt-1">
            {errors.payment.bank_acc_no.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Insurance No</label>
        <input
          {...register("payment.insurance_no", {
            required: "Insurance No is required",
            validate: (v) => v.length === 10 || "Must be 10 characters",
          })}
          className={`w-full p-2 border rounded ${
            errors.payment?.insurance_no ? "border-red-500" : "border-gray-300"
          }`}
          maxLength={10}
        />
        {errors.payment?.insurance_no && (
          <p className="text-red-500 text-xs mt-1">
            {errors.payment.insurance_no.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">EPF No</label>
        <input
          {...register("payment.epf_no", {
            required: "EPF No is required",
            validate: (v) => v.length === 10 || "Must be 10 characters",
          })}
          className={`w-full p-2 border rounded ${
            errors.payment?.epf_no ? "border-red-500" : "border-gray-300"
          }`}
          maxLength={10}
        />
        {errors.payment?.epf_no && (
          <p className="text-red-500 text-xs mt-1">
            {errors.payment.epf_no.message}
          </p>
        )}
      </div>
      {/* FK Dropdowns */}
      <div>
        <label className="block text-sm font-medium mb-1">Allowance</label>
        <select
          {...register("payment.allowance_id", {
            required: "Allowance is required",
          })}
          className={`w-full p-2 border rounded ${
            errors.payment?.allowance_id ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select Allowance</option>
          {mockAllowances.map((allowance) => (
            <option key={allowance.id} value={allowance.id}>
              {allowance.name} (LKR {allowance.amount})
            </option>
          ))}
        </select>
        {errors.payment?.allowance_id && (
          <p className="text-red-500 text-xs mt-1">
            {errors.payment.allowance_id.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Loan</label>
        <select
          {...register("payment.loan_id", { required: "Loan is required" })}
          className={`w-full p-2 border rounded ${
            errors.payment?.loan_id ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select Loan</option>
          {mockLoans.map((loan) => (
            <option key={loan.id} value={loan.id}>
              {loan.name} (LKR {loan.amount})
            </option>
          ))}
        </select>
        {errors.payment?.loan_id && (
          <p className="text-red-500 text-xs mt-1">
            {errors.payment.loan_id.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
