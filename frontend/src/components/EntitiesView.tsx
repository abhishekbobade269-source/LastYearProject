import React from 'react';
import { Building2, ExternalLink } from 'lucide-react';

export const EntitiesView: React.FC = () => {
  const entitiesList = [
    { id: 1, name: 'Sunrise Hotels Pvt. Ltd.', reg: 'REG-HOTEL-2025-01', location: '123, MG Road, Pune - 411001', email: 'compliance@sunrisehotels.com', nocCount: 3, status: 'Active' },
    { id: 2, name: 'Green Valley Industries', reg: 'REG-IND-2025-02', location: 'Plot 45, MIDC Industrial Area, Pune - 411026', email: 'legal@greenvalley.com', nocCount: 2, status: 'Active' },
    { id: 3, name: 'BuildTech Constructions', reg: 'REG-BUILD-2025-03', location: '78, Commercial Hub, Pune - 411004', email: 'info@buildtech.com', nocCount: 4, status: 'Active' },
    { id: 4, name: 'City Mall & Complex', reg: 'REG-MALL-2025-04', location: 'City Mall, FC Road, Pune - 411005', email: 'ops@citymall.com', nocCount: 1, status: 'Active' },
    { id: 5, name: 'Alpha Manufacturing', reg: 'REG-MFG-2025-05', location: 'Sector 12, Pimpri, Pune - 411018', email: 'admin@alphamfg.com', nocCount: 2, status: 'Active' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            Registered Entities & Organizations Directory
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Registered commercial buildings, hotels, factories, and corporate applicant profiles.
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/20 cursor-pointer">
          + Register New Entity
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {entitiesList.map((ent) => (
          <div key={ent.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs card-hover-glow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                  {ent.name.charAt(0)}
                </div>
                <span className="badge-pill badge-verified">{ent.status}</span>
              </div>

              <h4 className="text-base font-extrabold text-slate-900 mb-0.5">{ent.name}</h4>
              <span className="text-xs font-mono text-blue-600 font-bold block mb-3">{ent.reg}</span>

              <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4 font-medium">
                <div>Address: <strong className="text-slate-800">{ent.location}</strong></div>
                <div>Email: <strong className="text-slate-800">{ent.email}</strong></div>
                <div>Active NOC Certificates: <strong className="text-blue-700 font-bold">{ent.nocCount} Issued</strong></div>
              </div>
            </div>

            <button 
              onClick={() => alert(`Opening profile for ${ent.name}...`)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800 font-bold text-xs rounded-xl transition-colors border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Entity Submissions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
