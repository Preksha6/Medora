import API from "../services/api";
import { useNavigate }
from "react-router-dom";

import authStore
from "../store/authStore";



const Setting = () => {

    const { user, logout } =
    authStore();
    const navigate =
useNavigate();
    const clearHistory = async () => {

        try {

            const confirmDelete =
            window.confirm(

                "Delete all analysis history?"
            );

            if (!confirmDelete)
                return;

            await API.delete(
                "/chat"
            );

            alert(
                "History cleared successfully"
            );

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="space-y-6">

            {/* Heading */}

            <div>

                <h2 className="text-3xl font-bold text-white">

                    Settings

                </h2>

                <p className="text-slate-400 mt-1">

                    Manage your account

                </p>

            </div>


            {/* Profile */}

            <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6">

                <h3 className="text-xl font-bold mb-5">

                    Patient Profile

                </h3>

                <div className="space-y-3 text-slate-300">

                    <p>

                        Name:
                        {user?.name}

                    </p>

                    <p>

                        Email:
                        {user?.email}

                    </p>

                </div>

            </div>


            {/* History Settings */}

            <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6">

                <h3 className="text-xl font-bold mb-5">

                    Analysis History

                </h3>

                <button
                    onClick={clearHistory}

                    className="bg-red-500 hover:bg-red-400 px-5 py-3 rounded-xl font-semibold text-white"
                >

                    Delete All History

                </button>

            </div>


            {/* Logout */}

            <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-6">

                <h3 className="text-xl font-bold text-red-400 mb-5">

                    Account

                </h3>

                <button
                    onClick={() => {
                        logout();
                        navigate("/logout");
                    }}

                    className="bg-red-500 hover:bg-red-400 px-5 py-3 rounded-xl font-semibold text-white"
                >

                    Logout

                </button>

            </div>

        </div>
    );
};

export default Setting;