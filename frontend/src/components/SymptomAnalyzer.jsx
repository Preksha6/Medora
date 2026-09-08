import React, { useState, useEffect } from "react";
import API from "../services/api";
import { 
  Stethoscope, 
  AlertCircle, 
  CheckCircle2, 
  MapPin, 
  ExternalLink, 
  Building2,
  Calendar,
  RotateCcw,
  Navigation
} from "lucide-react";

const SymptomAnalyzer = ({ onAnalysisComplete }) => {
  const [symptoms, setSymptoms] = useState("");
  const [manualCity, setManualCity] = useState("");
  const [userCoords, setUserCoords] = useState(null);
  const [geoStatus, setGeoStatus] = useState("prompt"); // 'prompt' | 'acquired' | 'denied' | 'unavailable'
  const [analysis, setAnalysis] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const commonExamples = [
    "Headache with sensitivity to bright light",
    "Persistent dry cough and mild fever",
    "Sharp lower abdominal discomfort",
    "Skin irritation with itching and redness"
  ];

  // Request browser geolocation (Primary Tier 1)
  const requestLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus("unavailable");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        });
        setGeoStatus("acquired");
      },
      (err) => {
        console.log("Geolocation permission status:", err.message);
        setGeoStatus("denied");
      },
      { timeout: 8000, enableHighAccuracy: false }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  const analyzeSymptoms = async (e) => {
    if (e) e.preventDefault();
    if (!symptoms.trim()) return;

    try {
      setLoading(true);
      setErrorMsg("");

      // Prepare payload with 4-tier location hierarchy support:
      // 1. Browser Geolocation (lat/lon)
      // 2. Manual address / city entry (if provided)
      const payload = {
        symptoms: symptoms.trim(),
        lat: userCoords?.lat || null,
        lon: userCoords?.lon || null,
        address: manualCity.trim() || null
      };

      const res = await API.post("/chat", payload);

      setAnalysis(res.data.aiResponse || null);
      setDoctors(res.data.recommendedDoctors || []);

      if (onAnalysisComplete) {
        onAnalysisComplete();
      }
    } catch (error) {
      console.log("Analysis error:", error);
      setErrorMsg(
        error.response?.data?.message || 
        "An error occurred while evaluating your symptoms. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getSeverityBadge = (severity) => {
    const sev = (severity || "").toLowerCase();
    if (sev === "severe") {
      return {
        style: "bg-rose-500/10 border-rose-500/30 text-rose-400",
        label: "Severe — Seek prompt medical evaluation"
      };
    }
    if (sev === "moderate") {
      return {
        style: "bg-amber-500/10 border-amber-500/30 text-amber-400",
        label: "Moderate — Medical consultation advised"
      };
    }
    return {
      style: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
      label: "Mild — Self-care and monitoring"
    };
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Symptom Assessment
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Describe what you are experiencing to receive an initial health assessment and specialist recommendations.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={analyzeSymptoms} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-2">
            What symptoms are you experiencing?
          </label>
          <textarea
            rows="4"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Please detail your symptoms, how long you have had them, and any related factors..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-500 outline-none transition"
          />
        </div>

        {/* Location Preferences */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-sky-400" />
              <span>Location for Doctor & Hospital Search:</span>
            </span>

            {geoStatus === "acquired" ? (
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Browser GPS Detected ({userCoords.lat.toFixed(2)}, {userCoords.lon.toFixed(2)})
              </span>
            ) : (
              <button
                type="button"
                onClick={requestLocation}
                className="text-[11px] text-sky-400 hover:text-sky-300 underline text-left"
              >
                Enable device GPS
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <input
              type="text"
              value={manualCity}
              onChange={(e) => setManualCity(e.target.value)}
              placeholder="Or enter city / neighborhood manually (e.g. Mumbai, Delhi, Salt Lake)..."
              className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-500 outline-none"
            />
          </div>
        </div>

        {/* Example prompts */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-500">Examples:</span>
          {commonExamples.map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSymptoms(ex)}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              {ex}
            </button>
          ))}
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={() => {
              setSymptoms("");
              setManualCity("");
            }}
            className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Clear
          </button>

          <button
            type="submit"
            disabled={loading || !symptoms.trim()}
            className={`px-6 py-2.5 rounded-xl font-medium text-sm transition flex items-center gap-2 ${
              loading || !symptoms.trim()
                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-500 text-white cursor-pointer"
            }`}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Evaluating Symptoms...</span>
              </>
            ) : (
              <>
                <Stethoscope className="w-4 h-4" />
                <span>Evaluate Symptoms</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Results Section */}
      {analysis && !loading && (
        <div className="space-y-6 pt-2">
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Identified Condition
                </span>
                <h3 className="text-2xl font-bold text-white mt-0.5">
                  {analysis.disease || "General Health Evaluation"}
                </h3>
              </div>

              <div>
                {(() => {
                  const badge = getSeverityBadge(analysis.severity);
                  return (
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${badge.style}`}>
                      {badge.label}
                    </span>
                  );
                })()}
              </div>
            </div>

            {/* Recommended Specialist */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Recommended Medical Field</span>
                <span className="text-base font-bold text-white">
                  {analysis.specialist || "General Physician"}
                </span>
              </div>
            </div>

            {/* Precautions */}
            {analysis.precautions && analysis.precautions.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Recommended Precautions
                </span>
                <div className="space-y-2">
                  {analysis.precautions.map((precaution, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{precaution}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <p className="text-[11px] text-slate-500 pt-2 leading-relaxed">
              * Note: This preliminary analysis is intended for guidance purposes and does not substitute for an in-person diagnostic examination by a certified physician.
            </p>
          </div>

          {/* Recommended Doctors from OpenStreetMap */}
          {doctors.length > 0 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  Nearby Healthcare Providers & Facilities
                </h3>
                <p className="text-xs text-slate-400">
                  Medical facilities matching {analysis.specialist || "general medicine"} in your vicinity.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctors.map((doctor, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-white text-sm">{doctor.name}</h4>
                        <span className="text-xs text-sky-400 font-medium">{doctor.specialty}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
                        Facility
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 space-y-1 bg-slate-950/40 p-3 rounded-xl">
                      <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{doctor.hospital}</span>
                      </div>
                      <div className="flex items-start gap-1.5 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{doctor.address}</span>
                      </div>
                    </div>

                    {doctor.lat && doctor.lon && (
                      <a
                        href={`https://www.google.com/maps?q=${doctor.lat},${doctor.lon}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-medium pt-1"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>View on Google Maps</span>
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
};

export default SymptomAnalyzer;