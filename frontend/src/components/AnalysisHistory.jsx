import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Trash2,
  Calendar,
  Search,
  Building2,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Stethoscope
} from "lucide-react";
import API from "../services/api";

const AnalysisHistory = ({ onHistoryChange }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await API.get("/chat/history");
      setHistory(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const deleteAnalysis = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this consultation record?")) return;

    try {
      await API.delete(`/chat/${id}`);
      setHistory(history.filter((item) => item._id !== id));
      if (onHistoryChange) {
        onHistoryChange();
      }
    } catch (error) {
      console.log("Delete failed:", error);
    }
  };

  const filteredHistory = history.filter((item) => {
    const disease = item.aiResponse?.disease?.toLowerCase() || "";
    const symptoms = item.symptoms?.toLowerCase() || "";
    const specialist = item.aiResponse?.specialist?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();

    const matchesSearch = disease.includes(term) || symptoms.includes(term) || specialist.includes(term);
    
    if (severityFilter === "all") return matchesSearch;
    const severity = (item.aiResponse?.severity || "mild").toLowerCase();
    return matchesSearch && severity === severityFilter.toLowerCase();
  });

  const getSeverityBadge = (severity) => {
    const s = (severity || "").toLowerCase();
    if (s === "severe") return "bg-rose-500/10 border-rose-500/30 text-rose-400";
    if (s === "moderate") return "bg-amber-500/10 border-amber-500/30 text-amber-400";
    return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Consultation History
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Log of your past symptom assessments, diagnosis notes, and recommendations.
          </p>
        </div>

        <div>
          <span className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300">
            Total records: <strong className="text-white">{history.length}</strong>
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search symptoms, conditions, or specialists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500 transition"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl shrink-0">
          {["all", "mild", "moderate", "severe"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSeverityFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition ${
                severityFilter === filter
                  ? "bg-sky-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* History List */}
      {loading ? (
        <div className="py-12 text-center text-slate-500 text-xs">
          Loading consultation records...
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
          <Stethoscope className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-sm font-medium text-slate-300">No records found</p>
          <p className="text-xs text-slate-500">
            {searchTerm || severityFilter !== "all"
              ? "No records match your search criteria."
              : "You have not performed any symptom checks yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => {
            const date = new Date(item.createdAt);
            const isOpen = openId === item._id;
            const severity = item.aiResponse?.severity || "Mild";
            const disease = item.aiResponse?.disease || "Clinical Assessment";

            return (
              <div
                key={item._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition"
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleDropdown(item._id)}
                  className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition select-none"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-bold text-sm text-white truncate">{disease}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getSeverityBadge(severity)}`}>
                        {severity}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {date.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate italic">"{item.symptoms}"</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => deleteAnalysis(item._id, e)}
                      className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="p-1.5 rounded-lg text-slate-400 bg-slate-800">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isOpen && (
                  <div className="border-t border-slate-800 p-5 bg-slate-950/40 space-y-4">
                    {/* Symptoms */}
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block mb-1">
                        Reported Symptoms
                      </span>
                      <p className="text-xs text-slate-300 italic">"{item.symptoms}"</p>
                    </div>

                    {/* Specialist */}
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Recommended Specialist Field:</span>
                      <span className="text-xs font-bold text-sky-400">
                        {item.aiResponse?.specialist || "General Physician"}
                      </span>
                    </div>

                    {/* Precautions */}
                    {item.aiResponse?.precautions?.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-xs font-semibold text-slate-300 block">
                          Advised Precautions
                        </span>
                        <div className="space-y-1.5">
                          {item.aiResponse.precautions.map((p, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Doctors */}
                    {item.recommendedDoctors?.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <span className="text-xs font-semibold text-slate-300 block">
                          Suggested Facilities
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {item.recommendedDoctors.map((doc, dIdx) => (
                            <div
                              key={dIdx}
                              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5"
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-white">{doc.name}</span>
                                <span className="text-[10px] text-sky-400">{doc.specialty}</span>
                              </div>
                              <p className="text-slate-400 text-[11px] truncate">{doc.hospital}</p>
                              {doc.lat && doc.lon && (
                                <a
                                  href={`https://www.google.com/maps?q=${doc.lat},${doc.lon}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300"
                                >
                                  <span>View on Maps</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default AnalysisHistory;