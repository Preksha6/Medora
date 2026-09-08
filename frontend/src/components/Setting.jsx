import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import authStore from "../store/authStore";
import { Trash2, LogOut, CheckCircle2, User, Shield } from "lucide-react";

const Setting = () => {
  const { user, logout } = authStore();
  const navigate = useNavigate();
  const [clearing, setClearing] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const clearHistory = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete all your consultation history?"
    );

    if (!confirmDelete) return;

    try {
      setClearing(true);
      await API.delete("/chat");
      setStatusMsg("Consultation history cleared successfully.");
      setTimeout(() => setStatusMsg(""), 4000);
    } catch (error) {
      console.log(error);
      alert("Failed to clear history. Please try again.");
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Account Settings
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Manage your account preferences and data retention.
        </p>
      </div>

      {statusMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Account Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-sky-400" />
          <span>Account Information</span>
        </h3>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between">
            <span className="text-slate-400">Registered Email</span>
            <span className="text-white font-medium">{user?.email || "Not specified"}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between">
            <span className="text-slate-400">Account Type</span>
            <span className="text-white font-medium capitalize">{user?.role || "Patient"}</span>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-amber-400" />
          <span>Data Retention</span>
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div>
            <h4 className="text-xs font-semibold text-white">Clear Consultation Records</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Permanently delete all previous symptom assessment records from your account.
            </p>
          </div>

          <button
            onClick={clearHistory}
            disabled={clearing}
            className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-medium transition flex items-center justify-center gap-2 shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{clearing ? "Clearing..." : "Delete All Records"}</span>
          </button>
        </div>
      </div>

      {/* Sign Out */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <LogOut className="w-4 h-4 text-rose-400" />
          <span>Session</span>
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div>
            <h4 className="text-xs font-semibold text-white">Sign Out of Medora</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              End your active session on this device.
            </p>
          </div>

          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-300 text-xs font-medium transition flex items-center justify-center gap-2 shrink-0"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default Setting;