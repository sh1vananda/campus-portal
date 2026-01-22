import React, { useState } from "react";
import PageHeader from "../components/layout/PageHeader";

const Fees = () => {
  const [form, setForm] = useState({
    year: "",
    semester: "",
    paymentItem: "",
    phone: "",
    email: "",
    currency: "",
    amount: "",
    bank: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("Payment Submitted! (UI Only — backend integration pending)");
    console.log("Form Data:", form);
    // TODO: connect to backend API when ready
  };

  return (
    <div className="py-8">
      <PageHeader title="Fee Payment" subtitle="Submit tuition or other fees" />

      <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm shadow-slate-200/50">
        {/* Year of Study */}
        <label className="block text-sm font-bold mb-1">Year of Study</label>
        <input
          name="year"
          value={form.year}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter Year"
        />

        {/* Semester */}
        <label className="block text-sm font-bold mb-1">Semester</label>
        <input
          name="semester"
          value={form.semester}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter Semester"
        />

        {/* Payment Item */}
        <label className="block text-sm font-bold mb-1">Payment For</label>
        <input
          name="paymentItem"
          value={form.paymentItem}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          placeholder="Tuition, Exam Fee, etc"
        />

        {/* Phone */}
        <label className="block text-sm font-bold mb-1">Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          placeholder="Phone Number"
        />

        {/* Email */}
        <label className="block text-sm font-bold mb-1">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          placeholder="Email Address"
        />

        {/* Currency */}
        <label className="block text-sm font-bold mb-1">Currency</label>
        <input
          name="currency"
          value={form.currency}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          placeholder="INR / USD"
        />

        {/* Amount */}
        <label className="block text-sm font-bold mb-1">Amount</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        {/* Bank */}
        <label className="block text-sm font-bold mb-1">Bank</label>
        <input
          name="bank"
          value={form.bank}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-6"
          placeholder="Bank Name"
        />

        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700"
        >
          Submit Payment
        </button>
      </div>
    </div>
  );
};

export default Fees;
