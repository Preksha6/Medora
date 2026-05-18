import { useEffect, useState } from "react";

import {
    ChevronDown,
    ChevronUp,
    Trash2
} from "lucide-react";

import API from "../services/api";

const AnalysisHistory = () => {

    const [history, setHistory] =
    useState([]);

    const [openId, setOpenId] =
    useState(null);

    useEffect(() => {

        fetchHistory();

    }, []);

    const fetchHistory = async () => {

        try {

            const res =
            await API.get(
                "/chat/history"
            );

            setHistory(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    const toggleDropdown = (id) => {

        if (openId === id) {

            setOpenId(null);

        } else {

            setOpenId(id);
        }
    };

    const deleteAnalysis = async (
        id
    ) => {

        try {

            await API.delete(
                `/chat/${id}`
            );

            setHistory(

                history.filter(
                    (item) =>
                    item._id !== id
                )
            );

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="space-y-5">

            {/* Heading */}

            <div>

                <h2 className="text-3xl font-bold text-white">

                    Analysis History

                </h2>

                <p className="text-slate-400 mt-1">

                    View all previous AI symptom analyses

                </p>

            </div>


            {/* Empty State */}

            {
                history.length === 0 ? (

                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">

                        No analysis history found.

                    </div>

                ) : (

                    history.map((item) => {

                        const date =
                        new Date(
                            item.createdAt
                        );

                        return (

                            <div
                                key={item._id}

                                className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden"
                            >

                                {/* Header */}

                                <div
                                    onClick={() =>
                                        toggleDropdown(item._id)
                                    }

                                    className="w-full flex items-center justify-between p-5 hover:bg-slate-700/30 transition cursor-pointer"
                                >

                                    {/* Left */}

                                    <div className="text-left">

                                        <p className="text-cyan-400 font-semibold">

                                            {
                                                date.toLocaleDateString()
                                            }

                                        </p>

                                        <p className="text-white mt-1">

                                            {
                                                item.symptoms
                                            }

                                        </p>

                                    </div>


                                    {/* Right */}

                                    <div className="flex items-center gap-4">

                                        {/* Delete */}

                                        <button
                                            onClick={(e) => {

                                                e.stopPropagation();

                                                deleteAnalysis(
                                                    item._id
                                                );
                                            }}

                                            className="text-red-400 hover:text-red-300 transition"
                                        >

                                            <Trash2 size={18} />

                                        </button>


                                        {/* Dropdown */}

                                        {
                                            openId === item._id ? (

                                                <ChevronUp
                                                    className="text-slate-400"
                                                />

                                            ) : (

                                                <ChevronDown
                                                    className="text-slate-400"
                                                />
                                            )
                                        }

                                    </div>

                                </div>


                                {/* Expanded Content */}

                                {
                                    openId === item._id && (

                                        <div className="border-t border-slate-700 p-5 bg-slate-900/40">

                                            <div className="space-y-5">

                                                {/* Disease */}

                                                <div>

                                                    <p className="text-slate-400 text-sm mb-1">

                                                        Disease

                                                    </p>

                                                    <h3 className="text-2xl font-bold text-cyan-400">

                                                        {
                                                            item.aiResponse?.disease
                                                        }

                                                    </h3>

                                                </div>


                                                {/* Severity */}

                                                <div>

                                                    <p className="text-slate-400 text-sm mb-2">

                                                        Severity

                                                    </p>

                                                    <div className={`
                                                        inline-flex px-4 py-2 rounded-full font-semibold

                                                        ${
                                                            item.aiResponse?.severity === "Severe"
                                                            ? "bg-red-500/20 text-red-400"

                                                            : item.aiResponse?.severity === "Moderate"
                                                            ? "bg-yellow-500/20 text-yellow-400"

                                                            : "bg-green-500/20 text-green-400"
                                                        }
                                                    `}>

                                                        {
                                                            item.aiResponse?.severity
                                                        }

                                                    </div>

                                                </div>


                                                {/* Precautions */}

                                                <div>

                                                    <p className="text-slate-400 text-sm mb-3">

                                                        Precautions

                                                    </p>

                                                    <div className="space-y-2">

                                                        {
                                                            item.aiResponse?.precautions?.map(
                                                                (
                                                                    precaution,
                                                                    index
                                                                ) => (

                                                                    <div
                                                                        key={index}

                                                                        className="bg-slate-800 rounded-xl p-3"
                                                                    >

                                                                        • {precaution}

                                                                    </div>
                                                                )
                                                            )
                                                        }

                                                    </div>

                                                </div>


                                                {/* Specialist */}

                                                <div>

                                                    <p className="text-slate-400 text-sm mb-1">

                                                        Recommended Specialist

                                                    </p>

                                                    <h3 className="text-xl font-bold text-cyan-400">

                                                        {
                                                            item.aiResponse?.specialist
                                                        }

                                                    </h3>

                                                </div>


                                                {/* Recommended Doctors */}

                                                {
                                                    item.recommendedDoctors?.length > 0 && (

                                                        <div>

                                                            <p className="text-slate-400 text-sm mb-4">

                                                                Recommended Doctors

                                                            </p>

                                                            <div className="grid md:grid-cols-2 gap-4">

                                                                {
                                                                    item.recommendedDoctors.map(
                                                                        (
                                                                            doctor,
                                                                            index
                                                                        ) => (

                                                                            <div
                                                                                key={index}

                                                                                className="bg-slate-800 border border-slate-700 rounded-2xl p-4"
                                                                            >

                                                                                <h3 className="text-lg font-bold text-cyan-400">

                                                                                    {
                                                                                        doctor.name
                                                                                    }

                                                                                </h3>

                                                                                <p className="text-slate-300 mt-1">

                                                                                    {
                                                                                        doctor.specialty
                                                                                    }

                                                                                </p>

                                                                                <p className="text-slate-400 text-sm mt-2">

                                                                                    {
                                                                                        doctor.hospital
                                                                                    }

                                                                                </p>

                                                                                <p className="text-slate-500 text-sm">

                                                                                    {
                                                                                        doctor.address
                                                                                    }

                                                                                </p>

                                                                                {
                                                                                    doctor.lat &&
                                                                                    doctor.lon && (

                                                                                        <a
                                                                                            href={`https://www.google.com/maps?q=${doctor.lat},${doctor.lon}`}

                                                                                            target="_blank"

                                                                                            rel="noreferrer"

                                                                                            className="inline-block mt-3 text-cyan-400 hover:text-cyan-300 text-sm"
                                                                                        >
                                                                                            Open Location →
                                                                                        </a>
                                                                                    )
                                                                                }

                                                                            </div>
                                                                        )
                                                                    )
                                                                }

                                                            </div>

                                                        </div>
                                                    )
                                                }

                                            </div>

                                        </div>
                                    )
                                }

                            </div>
                        );
                    })
                )
            }

        </div>
    );
};

export default AnalysisHistory;