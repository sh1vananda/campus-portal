import React, { useState } from "react";
import PageHeader from '../../components/layout/PageHeader';

const CourseAllocation = () => {
  const [form, setForm] = useState({
    courseCode: "",
    rollNo: "",
    section: "",
    semester: "",
    comments: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const validate = () => {
    if (form.courseCode.trim().length < 5) {
      setError("Course Code must be at least 5 characters.");
      return false;
    }
    if (form.rollNo.trim().length < 5) {
      setError("Roll No must be at least 5 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      // Only sending the fields required by the API
      const bodyToSend = {
        courseCode: form.courseCode.trim(),
        rollNo: form.rollNo.trim()
      };

      const res = await fetch(
        "https://rest-hhlo.onrender.com/api/courses/enroll-student",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyToSend),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccess("Student enrolled successfully!");
        setError(""); // clear error if any

        // reset only the relevant fields
        setForm({
          courseCode: "",
          rollNo: "",
          section: "",
          semester: "",
          comments: "",
        });

        console.log("Server Response:", data);
      } else {
        setError(
  data.message || data.error || "Enrollment failed. Please check the values and try again."
);

      }
    } catch (err) {
      setError("Network error. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div className="py-8">
      <PageHeader
        title="Course Allocation"
        subtitle="Enroll a student into a course."
      />

      {/* Top faculty overview (optional) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Total Courses Allocated", value: "6" },
          { label: "Active Students", value: "132" },
          { label: "Active Semesters", value: "3" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white border border-slate-100 p-8 rounded-2xl shadow-sm"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 mb-2">
              {stat.label}
            </p>
            <p className="text-3xl font-black text-slate-900 tracking-tight">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Form card */}
      <div className="max-w-xl mx-auto bg-white border border-slate-100 rounded-3xl p-6 shadow-sm shadow-slate-200/50">

        {/* Course Code */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Course Code</label>
          <input
            type="text"
            name="courseCode"
            value={form.courseCode}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter course code"
          />
        </div>

        {/* Roll No */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Roll No</label>
          <input
            type="text"
            name="rollNo"
            value={form.rollNo}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter student roll number"
          />
        </div>
{/* Optional fields (info only, not sent to API) */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Section (optional)</label>
          <input
            type="text"
            name="section"
            value={form.section}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Section"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Semester (optional)</label>
          <input
            type="text"
            name="semester"
            value={form.semester}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Semester"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Comments (optional)</label>
          <textarea
            name="comments"
            value={form.comments}
            onChange={handleChange}
            rows="3"
            className="w-full border p-2 rounded"
            placeholder="Any notes (doesn’t get sent to backend)"
          />
        </div>

        {/* Validation messages */}
        {error && (
          <p className="text-sm text-red-600 font-bold mb-2">{error}</p>
        )}
        {success && (
          <p className="text-sm text-green-600 font-bold mb-2">{success}</p>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="w-full px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
        >
          Submit Allocation
        </button>
      </div>
    </div>
  );
};

export default CourseAllocation;
