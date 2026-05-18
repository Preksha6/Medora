import { useState } from "react";

import API from "../services/api";

const SymptomAnalyzer = () => {

    const [symptoms, setSymptoms] =
    useState("");

    const [analysis, setAnalysis] =
    useState(null);
    const [loading, setLoading] =
    useState(false);

    const [doctors, setDoctors] =
    useState([]);

    const analyzeSymptoms = async () => {

        try {

            setLoading(true);

            const res = await API.post(
                "/chat",
                {
                    symptoms
                }
            );

            console.log(res.data);

setAnalysis(
    res.data.aiResponse || null
);

setDoctors(
    res.data.recommendedDoctors || []
);
        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="space-y-5">

            <h2 className="text-3xl font-bold">
                AI Symptom Checker
            </h2>

            <textarea
                rows="6"

                value={symptoms}

                onChange={(e) =>
                    setSymptoms(e.target.value)
                }

                placeholder="Describe your symptoms..."

                className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 outline-none"
            />

            <button
                onClick={analyzeSymptoms}

                className="bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-xl font-semibold"
            >
                {
                    loading
                    ? "Analyzing..."
                    : "Analyze Symptoms"
                }
            </button>

           {
    analysis && (

        <div className="space-y-6 mt-8">

            {/* Disease */}

            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-6">

                <p className="text-slate-400 mb-2">

                    Possible Disease

                </p>

                <h2 className="text-4xl font-bold text-cyan-400">

                    {analysis.disease}

                </h2>

            </div>


            {/* Severity */}

            <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6">

                <p className="text-slate-400 mb-3">

                    Severity

                </p>

                <div className={`
                    inline-flex px-5 py-2 rounded-full text-sm font-bold

                    ${
                        analysis.severity === "Severe"
                        ? "bg-red-500/20 text-red-400"

                        : analysis.severity === "Moderate"
                        ? "bg-yellow-500/20 text-yellow-400"

                        : "bg-green-500/20 text-green-400"
                    }
                `}>

                    {analysis.severity}

                </div>

            </div>


            {/* Precautions */}

            <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6">

                <h3 className="text-2xl font-bold mb-5">

                    Precautions

                </h3>

                <div className="space-y-3">

                    {
                        analysis.precautions?.map(
                            (item, index) => (

                            <div
                                key={index}

                                className="bg-slate-900 rounded-2xl p-4 border border-slate-700"
                            >

                                • {item}

                            </div>
                        ))
                    }

                </div>

            </div>


            {/* Specialist */}

            <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6">

                <p className="text-slate-400 mb-2">

                    Recommended Specialist

                </p>

                <h2 className="text-3xl font-bold text-cyan-400">

                    {analysis.specialist}

                </h2>

            </div>

        </div>
    )
}

            {
    doctors.length > 0 && (

        <div className="mt-10">

            <h2 className="text-3xl font-bold mb-6">

                Recommended Doctors

            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                {
                    doctors.map(
                        (doctor, index) => (

                        <div
                            key={index}

                            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-6 hover:border-cyan-500 transition"
                        >

                            <div className="flex items-center gap-4">

                                <div className="h-14 w-14 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl font-bold">

                                    {
                                        doctor.name?.charAt(0)
                                    }

                                </div>

                                <div>

                                    <h3 className="text-xl font-bold text-white">

                                        {doctor.name}

                                    </h3>

                                    <p className="text-cyan-400">

                                        {
                                            doctor.specialty
                                        }

                                    </p>

                                </div>

                            </div>

                            <div className="mt-5 space-y-2 text-sm text-slate-300">

                                <p>

                                    📍 <p className="text-cyan-400 mt-2">

                                            {doctor.hospital}

                                        </p>

                                        <a
                                            href={`https://www.google.com/maps?q=${doctor.lat},${doctor.lon}`}

                                            target="_blank"

                                            rel="noreferrer"

                                            className="text-cyan-400 mt-3 inline-block"
                                            >
                                            Open Location →
                                        </a>

                                </p>

                            </div>

                            {
                                doctor.website && (

                                    <a
                                        href={doctor.website}

                                        target="_blank"

                                        rel="noreferrer"

                                        className="inline-block mt-5 text-cyan-400 hover:text-cyan-300"
                                    >
                                        Visit Website →
                                    </a>
                                )
                            }

                        </div>
                    ))
                }

            </div>

        </div>
    )
}

        </div>
    );
};

export default SymptomAnalyzer;