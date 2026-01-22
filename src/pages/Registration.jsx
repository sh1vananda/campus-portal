import React, { useMemo, useState } from "react";
import PageHeader from "../components/layout/PageHeader";

const Registration = () => {
  // can Toggle this later based on backend response
  const [isRegistrationOpen] = useState(false);

  // Mock Data 
  const [availableCourses, setAvailableCourses] = useState([
    {
      id: "c1",
      code: "CSE301",
      title: "Database Systems",
      faculty: "Dr. Mehta",
      credits: 4,
      slot: "A1",
      category: "Core",
    },
    {
      id: "c2",
      code: "CSE302",
      title: "Computer Networks",
      faculty: "Dr. Rao",
      credits: 3,
      slot: "B1",
      category: "Core",
    },
    {
      id: "c3",
      code: "CSE304",
      title: "Machine Learning",
      faculty: "Dr. Gupta",
      credits: 3,
      slot: "D1",
      category: "Elective",
    },
    {
      id: "c4",
      code: "CSE305",
      title: "Software Engineering",
      faculty: "Dr. Sharma",
      credits: 3,
      slot: "E1",
      category: "Core",
    },
  ]);

  const [registeredCourses, setRegisteredCourses] = useState([
    {
      id: "r1",
      code: "CSE201",
      title: "Data Structures",
      faculty: "Dr. Jain",
      credits: 4,
      slot: "F1",
      category: "Core",
    },
  ]);

  const [query, setQuery] = useState("");

  const filteredAvailable = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return availableCourses;

    return availableCourses.filter((c) => {
      return (
        c.code.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.faculty.toLowerCase().includes(q) ||
        c.slot.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    });
  }, [query, availableCourses]);

  const handleRegister = (course) => {
    if (!isRegistrationOpen) return;

    setAvailableCourses((prev) => prev.filter((c) => c.id !== course.id));
    setRegisteredCourses((prev) => [course, ...prev]);
  };

  const handleDrop = (course) => {
    if (!isRegistrationOpen) return;

    setRegisteredCourses((prev) => prev.filter((c) => c.id !== course.id));
    setAvailableCourses((prev) => [...prev, course]);
  };

  return (
    <div className="py-8">
      <PageHeader
        title="Course Registration"
        subtitle="Search and register courses. This module will be connected to backend in the next phase."
        right={
          <div className="w-full md:w-[340px]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by code, faculty, slot..."
              className="w-full px-5 py-3 rounded-2xl bg-white border border-slate-100 shadow-sm shadow-slate-200/50 text-sm outline-none focus:border-indigo-200"
            />
          </div>
        }
      />

      {/*Registration Status Banner */}
      {!isRegistrationOpen ? (
        <div className="mb-6 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm shadow-slate-200/50">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            Registration Status
          </p>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-lg font-bold text-slate-900">
                Course Registration is not available for you right now.
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Please contact your Academic Office / Admin to check the
                registration window or eligibility.
              </p>
            </div>

            <div className="flex gap-3">
              <button className="px-5 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-all">
                Contact Admin
              </button>
              <button className="px-5 py-2.5 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-100 transition-all">
                View Guidelines
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm shadow-slate-200/50">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            Registration Status
          </p>
          <p className="text-lg font-bold text-slate-900">
            Course Registration is Open ✅
          </p>
          <p className="text-sm text-slate-500 mt-1">
            You can register and drop courses during the active registration
            window.
          </p>
        </div>
      )}

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Courses */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm shadow-slate-200/50">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Available Courses
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Select a course to register.
              </p>
            </div>

            <Badge text={`${filteredAvailable.length} available`} />
          </div>

          <CourseTable
            rows={filteredAvailable}
            emptyText="No courses found."
            actionLabel="Register"
            actionStyle="primary"
            disabled={!isRegistrationOpen}
            onAction={handleRegister}
          />
        </div>

        {/* Registered Courses */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm shadow-slate-200/50">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Registered Courses
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Courses already registered by you.
              </p>
            </div>

            <Badge
              text={`${registeredCourses.length} registered`}
              type="success"
            />
          </div>

          <CourseTable
            rows={registeredCourses}
            emptyText="No registered courses yet."
            actionLabel="Drop"
            actionStyle="danger"
            disabled={!isRegistrationOpen}
            onAction={handleDrop}
          />
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-6 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm shadow-slate-200/50">
        <p className="text-xs text-slate-500">
          <span className="font-bold text-slate-900">Note:</span> Buttons are
          currently UI-based. Backend integration will enable real register/drop
          updates in MongoDB.
        </p>
      </div>
    </div>
  );
};

function Badge({ text, type = "default" }) {
  const styles =
    type === "success"
      ? "bg-indigo-50 text-indigo-700 border-indigo-100"
      : "bg-slate-50 text-slate-700 border-slate-100";

  return (
    <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${styles}`}>
      {text}
    </span>
  );
}

function CourseTable({
  rows,
  emptyText,
  actionLabel,
  actionStyle,
  disabled,
  onAction,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Code
            </th>
            <th className="py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Course
            </th>
            <th className="py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Credits
            </th>
            <th className="py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Slot
            </th>
            <th className="py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-50 text-sm">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-6 text-center text-slate-500">
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((c) => (
              <tr key={c.id}>
                <td className="py-4 font-bold text-slate-900">{c.code}</td>

                <td className="py-4">
                  <p className="font-bold text-slate-900">{c.title}</p>
                  <p className="text-xs text-slate-500">
                    {c.faculty} • {c.category}
                  </p>
                </td>

                <td className="py-4 text-slate-600">{c.credits}</td>

                <td className="py-4">
                  <span className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-50 border border-slate-100 text-slate-700">
                    {c.slot}
                  </span>
                </td>

                <td className="py-4 text-right">
                  <button
                    onClick={() => onAction(c)}
                    disabled={disabled}
                    className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all ${
                      disabled
                        ? "bg-slate-50 text-slate-400 cursor-not-allowed"
                        : actionStyle === "danger"
                        ? "bg-slate-50 text-red-600 hover:bg-slate-100"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    {actionLabel}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Registration;
