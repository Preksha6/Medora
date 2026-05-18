import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, BrainCircuit, Stethoscope } from 'lucide-react';

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Symptom Analysis',
    desc: 'Analyze symptoms intelligently using AI-powered healthcare workflows.',
  },
  {
    icon: Stethoscope,
    title: 'Doctor Recommendation',
    desc: 'Get matched with the most suitable specialist instantly.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Records',
    desc: 'Protected patient medical records with scalable microservices.',
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="bg-white/90 backdrop-blur border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
              <Activity className="text-white w-6 h-6" />
            </div>
            <h1 className="font-bold text-2xl text-slate-800">Medora</h1>
          </div>

          <div className="flex gap-4">
            <Link to="/login" className="text-slate-700 font-medium">Login</Link>
            <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            Intelligent Healthcare Platform
          </div>

          <h1 className="text-6xl font-black text-slate-900 leading-tight">
            Smart Hospital Platform Built With AI
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Analyze symptoms, detect anomalies, recommend specialists, and manage healthcare workflows using a scalable MERN microservices architecture.
          </p>

          <div className="flex gap-4 mt-10">
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-blue-200 transition-all"
            >
              Launch Dashboard
            </Link>

            <Link
              to="/login"
              className="border border-slate-300 px-8 py-4 rounded-2xl font-semibold text-slate-700 hover:bg-white"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl shadow-blue-100">
          <div className="grid gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="p-5 rounded-2xl border border-slate-100 bg-slate-50">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                    <Icon className="text-blue-600 w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 mt-2 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
