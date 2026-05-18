import authStore from "../store/authStore.js";

const Profile = () => {

    const { user } = authStore();

    return (

        <div className="bg-slate-800 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold mb-5">
                Patient Profile
            </h2>

            <div className="space-y-3">

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
    );
};

export default Profile;