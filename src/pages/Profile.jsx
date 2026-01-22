import PageHeader from "../components/layout/PageHeader";

const Profile = () => {
  // Later: replace with API data
  const profile = {
    name: "Vimoh Sharma",
    regNo: "22BCE0000",
    role: "Student",
    program: "B.Tech",
    branch: "Computer Science Engineering",
    year: "3rd Year",
    email: "vimohsharma@gmail.com",
    phone: "+91 96674 31417",
    dob: "12 July 2003",
    mentor: "Dr. A. Sharma",
    address: "Noida, India",
  };

  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="py-8">
      <PageHeader
        title="Profile"
        subtitle="Your personal and academic information. Backend integration to be done."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Identity Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm shadow-slate-200/50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold">
              {initials}
            </div>

            <div>
              <p className="text-lg font-bold text-slate-900">{profile.name}</p>
              <p className="text-sm text-slate-500">{profile.regNo}</p>
              <p className="text-xs font-bold text-indigo-600 mt-1">
                {profile.role}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <InfoRow label="Program" value={profile.program} />
            <InfoRow label="Branch" value={profile.branch} />
            <InfoRow label="Year" value={profile.year} />
            <InfoRow label="Mentor" value={profile.mentor} />
          </div>

          <button
            disabled
            className="mt-6 w-full px-5 py-2.5 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-100 transition-all opacity-60 cursor-not-allowed"
          >
            Edit Profile (Coming Soon)
          </button>
        </div>

        {/* Right: Details */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm shadow-slate-200/50">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5">
            Contact & Personal Info
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MiniInfo label="Email" value={profile.email} />
            <MiniInfo label="Phone" value={profile.phone} />
            <MiniInfo label="Date of Birth" value={profile.dob} />
            <MiniInfo
              label="Address"
              value={profile.address}
              className="md:col-span-2"
            />
          </div>

          {/* Footer strip */}
          <div className="mt-6 border border-slate-100 rounded-2xl p-4 bg-slate-50/60">
            <p className="text-xs text-slate-500">
              <span className="font-bold text-slate-900">Note:</span> Can add something here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}

function MiniInfo({ label, value, className = "" }) {
  return (
    <div className={`border border-slate-100 rounded-2xl p-4 ${className}`}>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-sm font-bold text-slate-900 mt-2">{value}</p>
    </div>
  );
}

export default Profile;
