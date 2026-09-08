import React, { useState } from "react";
import { 
  FileText, 
  UploadCloud, 
  Trash2, 
  Plus, 
  FileCheck 
} from "lucide-react";

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      addFile(e.dataTransfer.files[0]);
    }
  };

  const addFile = (file) => {
    const newRecord = {
      id: Date.now(),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      date: new Date().toLocaleDateString()
    };
    setRecords((prev) => [newRecord, ...prev]);
  };

  const deleteRecord = (id) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Medical Records
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Upload and organize personal medical reports, prescriptions, and lab tests.
        </p>
      </div>

      {/* Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`p-8 rounded-2xl border-2 border-dashed text-center transition ${
          dragActive
            ? "border-sky-500 bg-sky-500/10"
            : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
        }`}
      >
        <UploadCloud className="w-10 h-10 text-slate-500 mx-auto mb-3" />
        <p className="text-sm font-medium text-white">
          Drag and drop medical documents here
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Supports PDF, PNG, or JPG files from your doctor or diagnostic lab
        </p>

        <label className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Select Document</span>
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                addFile(e.target.files[0]);
              }
            }}
          />
        </label>
      </div>

      {/* Records List */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-300">
          Uploaded Documents ({records.length})
        </h3>

        {records.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <FileText className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm text-slate-400">No documents uploaded yet</p>
            <p className="text-xs text-slate-500 mt-1">
              Uploaded reports and prescriptions will be listed here.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {records.map((rec) => (
              <div
                key={rec.id}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 shrink-0">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-medium text-white truncate">{rec.name}</p>
                    <p className="text-xs text-slate-500">
                      {rec.size} • Uploaded on {rec.date}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => deleteRecord(rec.id)}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                  title="Remove Document"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default MedicalRecords;