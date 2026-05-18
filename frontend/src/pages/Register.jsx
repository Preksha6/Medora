import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { Activity, Lock, Mail, ArrowRight, User as UserIcon } from 'lucide-react';


const Register = () => {

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [age, setAge] = useState('');

  const [gender, setGender] = useState('');

  const {
    register,
    isLoading,
    error
  } = useAuthStore();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    const success = await register(
      name,
      email,
      password,
      age,
      gender
    );

    if (success) {
      navigate('/dashboard');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-bl from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden text-slate-100">
      <div className="absolute top-20 right-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-indigo-500/20 hover:border-white/30">
          
          <div className="flex justify-center mb-6">
            <div className="bg-linear-to-tr from-purple-500 to-indigo-600 p-3 rounded-2xl shadow-lg">
              <Activity className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-extrabold text-center mb-2 bg-clip-text text-transparent bg-linear-to-r from-purple-200 to-indigo-100">
            Join MediSync
          </h2>
          <p className="text-indigo-200/60 text-center mb-8 text-sm">
            Create an account to continue
          </p>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm flex items-center">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></div>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-indigo-200/80 ml-1">Full Name</label>
              <div className="relative group">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-white placeholder-indigo-200/30 outline-none transition-all"
                  placeholder="Enter your Full Name"
                  required
                />
                </div>
                
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-indigo-200/80 ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-indigo-300/50 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-white placeholder-indigo-200/30 outline-none transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-indigo-200/80 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-indigo-300/50 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-white placeholder-indigo-200/30 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-indigo-200/80 ml-1">Age</label>
              <div className="relative group">
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-white placeholder-indigo-200/30 outline-none transition-all"
                  placeholder="Enter your Age"
                  required
                />
                </div>
                
            </div>

            <div className="space-y-1">

  <label className="text-sm font-medium text-indigo-200/80 ml-1">
    Gender
  </label>

  <select
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    className="w-full px-4 py-3.5 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-white outline-none transition-all"
    required
  >
    <option value="">Select Gender</option>

    <option value="Male">Male</option>

    <option value="Female">Female</option>

    <option value="Other">Other</option>

  </select>

</div>


            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 mt-6 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-600/30 transform transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center group"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-indigo-200/60">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
