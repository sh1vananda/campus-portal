import React, { useState } from "react";
import PageHeader from "../components/layout/PageHeader";

const Support = () => {
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("Ticket Raised! (UI Only — backend integration pending)");
    console.log("Ticket Data:", ticket);
    // TODO: connect to backend
  };

  return (
    <div className="py-8">
      <PageHeader
        title="Ticketing Support"
        subtitle="Report an issue or request assistance"
      />

      <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm shadow-slate-200/50">
        {/* Title */}
        <label className="block text-sm font-bold mb-1">Subject</label>
        <input
          name="title"
          value={ticket.title}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter issue title"
        />

        {/* Description */}
        <label className="block text-sm font-bold mb-1">Description</label>
        <textarea
          name="description"
          value={ticket.description}
          onChange={handleChange}
          rows="5"
          className="w-full border p-2 rounded mb-6"
        />

        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700"
        >
          Raise Ticket
        </button>
      </div>
    </div>
  );
};

export default Support;
