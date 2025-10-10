import React from "react";
import { useFormContext } from "react-hook-form";

const PaymentForm = ({ empNo, masterData }) => {
  // Added props
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="hidden" {...register("payment.emp_no")} value={empNo} />{" "}
      {/* Fixed value */}
      <div>
        <label className="block text-sm font-medium mb-1">Pay Code</label>
        <input
          {...register("payment.pay_code")}
          className={`w-full p-2 border rounded ${
            errors.payment?.pay_code ? "border-red-500" : "border-gray-300"
          }`}
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
          {...register("payment.basic_pay")}
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
          {...register("payment.bank_acc_no")}
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
          {...register("payment.insurance_no")}
          className={`w-full p-2 border rounded ${
            errors.payment?.insurance_no ? "border-red-500" : "border-gray-300"
          }`}
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
          {...register("payment.epf_no")}
          className={`w-full p-2 border rounded ${
            errors.payment?.epf_no ? "border-red-500" : "border-gray-300"
          }`}
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
          {...register("payment.allowance_id")}
          className={`w-full p-2 border rounded ${
            errors.payment?.allowance_id ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select Allowance</option>
          {masterData.allowances.map(
            (
              allowance // Fixed to masterData
            ) => (
              <option
                key={allowance.allowance_id}
                value={allowance.allowance_id}
              >
                {allowance.name} (LKR {allowance.amount})
              </option>
            )
          )}
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
          {...register("payment.loan_id")}
          className={`w-full p-2 border rounded ${
            errors.payment?.loan_id ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select Loan</option>
          {masterData.loans.map(
            (
              loan // Fixed
            ) => (
              <option key={loan.loan_id} value={loan.loan_id}>
                {loan.l_name} (LKR {loan.amount})
              </option>
            )
          )}
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
