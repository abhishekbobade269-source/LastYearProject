import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Building, 
  Award, 
  ShieldCheck, 
  FileCheck2, 
  Clock, 
  BarChart2, 
  Edit3, 
  Save, 
  X, 
  Phone, 
  Calendar, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: 'R. Sharma',
    age: '42',
    gender: 'Male',
    email: 'r.sharma@gov.in',
    phone: '+91 98765 43210',
    govId: 'GOV-PU-8942',
    department: 'Pune Fire Department',
    designation: 'Senior Approving Officer',
    dob: '1983-08-14',
    address: 'Central Fire Station, Station Road, Pune - 411001'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-blue-900 text-white flex items-center justify-center font-black text-xl shadow-md ring-4 ring-blue-500/20">
            {profileData.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{profileData.name}</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1 border border-emerald-300">
                <ShieldCheck className="w-3 h-3" /> Verified Officer
              </span>
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              {profileData.designation} — {profileData.department}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-4 py-1.5 bg-blue-50 text-blue-700 text-xs font-mono font-bold rounded-xl border border-blue-200">
            ID: {profileData.govId}
          </span>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer ${
              isEditing 
                ? 'bg-slate-200 hover:bg-slate-300 text-slate-800' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
            }`}
          >
            {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            <span>{isEditing ? 'Cancel Editing' : 'Edit Profile Information'}</span>
          </button>
        </div>
      </div>

      {/* Success Alert */}
      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Profile information updated successfully and synced across NOC VERIFY Platform!</span>
        </div>
      )}

      {/* Official Government Credential Badge */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/80 text-white rounded-2xl shadow-md backdrop-blur-xs border border-white/20">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-300 block">GOVERNMENT OF MAHARASHTRA</span>
              <h4 className="text-lg font-extrabold text-white tracking-tight">Registered Approving Authority Credential</h4>
              <p className="text-xs text-slate-300 font-medium">Digital Signature RSA-4096 Key Fingerprint Validated</p>
            </div>
          </div>
          <div className="text-right font-mono text-xs text-slate-300">
            <span className="block text-[10px] text-slate-400 font-sans uppercase font-bold">Public Key Hash</span>
            <span className="text-blue-400 font-bold">0x9F4A...82B1</span>
          </div>
        </div>
      </div>

      {/* Form or Display View */}
      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-blue-600" /> Edit Personal & Official Information
            </h4>
            <span className="text-xs text-slate-400 font-medium">* Required Fields</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Age *</label>
              <input
                type="number"
                required
                value={profileData.age}
                onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Sex / Gender *</label>
              <select
                value={profileData.gender}
                onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 font-bold"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Email *</label>
              <input
                type="email"
                required
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Contact Phone Number *</label>
              <input
                type="text"
                required
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Date of Birth *</label>
              <input
                type="date"
                required
                value={profileData.dob}
                onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Assigned Department *</label>
              <input
                type="text"
                required
                value={profileData.department}
                onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Designation / Rank *</label>
              <input
                type="text"
                required
                value={profileData.designation}
                onChange={(e) => setProfileData({ ...profileData, designation: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 font-bold"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block font-bold text-slate-700 mb-1">Office Address *</label>
              <input
                type="text"
                required
                value={profileData.address}
                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 font-bold"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Updates</span>
            </button>
          </div>
        </form>
      ) : (
        /* Read-Only Details Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Officer Name</span>
            <span className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" /> {profileData.name}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Age & Gender</span>
            <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600" /> {profileData.age} Yrs ({profileData.gender})
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Official Email</span>
            <span className="text-sm font-bold text-blue-700 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" /> {profileData.email}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Phone Number</span>
            <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600" /> {profileData.phone}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Government ID</span>
            <span className="text-sm font-mono font-extrabold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> {profileData.govId}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Department</span>
            <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-amber-600" /> {profileData.department}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs md:col-span-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Office Address</span>
            <span className="text-xs font-semibold text-slate-800 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" /> {profileData.address}
            </span>
          </div>
        </div>
      )}

      {/* Performance Analytics */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-blue-600" /> Officer Approval Performance Analytics
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100">
            <FileCheck2 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <span className="text-3xl font-black text-blue-700 block">168</span>
            <span className="text-xs font-bold text-slate-600">Total Approved NOCs</span>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <Clock className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <span className="text-3xl font-black text-emerald-700 block">4.2 Hours</span>
            <span className="text-xs font-bold text-slate-600">Average Turnaround Time</span>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100">
            <ShieldCheck className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
            <span className="text-3xl font-black text-indigo-700 block">99.8%</span>
            <span className="text-xs font-bold text-slate-600">Audit Compliance Score</span>
          </div>
        </div>
      </div>
    </div>
  );
};
