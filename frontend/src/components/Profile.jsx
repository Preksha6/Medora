import React from "react";
import authStore from "../store/authStore.js";
import { User, Mail, Calendar, ShieldCheck, UserCheck } from "lucide-react";

const Profile = () => {
  const { user } = authStore();

  const displayName = user?.name || user?.email?.split("@")[0] || "Patient";

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Patient Profile
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Personal details and account credentials registered with your Medora account.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
          <div className="w-16 h-16 rounded-xl bg-sky-600/20 text-sky-400 border border-sky-500/30 flex items-center justify-center text-2xl font-bold">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{displayName}</h3>
            <p className="text-xs text-slate-400">{user?.email}</p>
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Registered Patient Account
            </span>
          </div>
        </div>

        {/* Real Profile Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-500 uppercase tracking-wider block">Full Name</span>
            <span className="text-sm font-semibold text-white mt-1 block">
              {user?.name || "Not specified"}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-500 uppercase tracking-wider block">Email Address</span>
            <span className="text-sm font-semibold text-white mt-1 block truncate">
              {user?.email || "Not specified"}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-500 uppercase tracking-wider block">Age</span>
            <span className="text-sm font-semibold text-white mt-1 block">
              {user?.age ? `${user.age} years` : "Not specified"}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-500 uppercase tracking-wider block">Gender</span>
            <span className="text-sm font-semibold text-white mt-1 block capitalize">
              {user?.gender || "Not specified"}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;