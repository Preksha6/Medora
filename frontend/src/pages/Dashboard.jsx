import React, { useEffect, useState } from 'react';
import authStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import API from '../services/api.js';
import Setting from "../components/Setting.jsx";
import SymptomAnalyzer from '../components/SymptomAnalyzer';
import AnalysisHistory from '../components/AnalysisHistory';
import Profile from '../components/Profile';
import MedicalRecords from '../components/MedicalRecords';

import { 
  Activity, 
  LogOut, 
  User, 
  LayoutDashboard, 
  FileText, 
  Stethoscope, 
  History, 
  ChevronRight, 
  Menu, 
  X, 
  Settings, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Building2, 
  PhoneCall, 
  AlertCircle 
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout, fetchProfile } = authStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile();
    }
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoadingHistory(true);
      const res = await API.get('/chat/history');
      if (Array.isArray(res.data)) {
        setHistory(res.data);
      }
    } catch (err) {
      console.log('Error loading consultation history:', err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const displayName = user?.name || user?.email?.split('@')[0] || 'Patient';
  const latestConsultation = history.length > 0 ? history[0] : null;

  const NavItem = ({ id, icon: Icon, label, count }) => {
    const isActive = activeTab === id;
    return (
      <button
        onClick={() => {
          setActiveTab(id);
          setMobileMenuOpen(false);
        }}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors text-sm font-medium ${
          isActive 
            ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30' 
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
        }`}
      >
        <div className="flex items-center space-x-3">
          <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
          <span>{label}</span>
        </div>
        {typeof count === 'number' && count > 0 && (
          <span className="px-2 py-0.5 text-xs rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {count}
          </span>
        )}
      </button>
    );
  };

  const renderOverview = () => (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
              Patient Portal
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Welcome, {displayName}
            </h2>
            <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
              Check symptoms, find recommended medical specialists in your area, and review your historical consultation records.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('analyzer')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium text-sm transition shadow-sm"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Check Symptoms</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-medium text-sm transition"
            >
              <History className="w-4 h-4" />
              <span>Consultation Records</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real Statistics from Database */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Consultations */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Total Consultations</span>
            <History className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-3xl font-bold text-white">
            {history.length}
          </div>
          <p className="text-xs text-slate-500 mt-2">Recorded evaluations</p>
        </div>

        {/* Latest Assessment */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Latest Condition</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-white truncate">
            {latestConsultation?.aiResponse?.disease || 'None recorded'}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {latestConsultation 
              ? new Date(latestConsultation.createdAt).toLocaleDateString()
              : 'Start your first assessment'}
          </p>
        </div>

        {/* Recommended Specialist */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Last Matched Field</span>
            <Building2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-lg font-bold text-white truncate">
            {latestConsultation?.aiResponse?.specialist || 'General Medicine'}
          </div>
          <p className="text-xs text-slate-500 mt-2">Based on your symptoms</p>
        </div>

        {/* Account Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Account Status</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-emerald-400">
            Active
          </div>
          <p className="text-xs text-slate-500 mt-2">{user?.email || 'Verified patient'}</p>
        </div>
      </div>

      {/* Main Grid: Consultations & Medical Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Recent Consultations */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <History className="w-4 h-4 text-sky-400" />
                <span>Recent Consultations</span>
              </h3>
              {history.length > 0 && (
                <button
                  onClick={() => setActiveTab('history')}
                  className="text-xs font-medium text-sky-400 hover:text-sky-300 flex items-center gap-1"
                >
                  View all ({history.length}) <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {loadingHistory ? (
              <div className="py-8 text-center text-slate-500 text-xs">
                Loading consultations...
              </div>
            ) : history.length > 0 ? (
              <div className="space-y-3">
                {history.slice(0, 4).map((item) => {
                  const disease = item.aiResponse?.disease || 'General Evaluation';
                  const severity = item.aiResponse?.severity || 'Mild';
                  const specialist = item.aiResponse?.specialist || 'General Physician';
                  const date = new Date(item.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  });

                  return (
                    <div
                      key={item._id}
                      onClick={() => setActiveTab('history')}
                      className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition cursor-pointer flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2.5">
                          <h4 className="font-semibold text-sm text-white truncate">{disease}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                            severity.toLowerCase() === 'severe' 
                              ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' 
                              : severity.toLowerCase() === 'moderate'
                              ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          }`}>
                            {severity}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 truncate">Symptoms: "{item.symptoms}"</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs text-slate-400 block">{specialist}</span>
                        <span className="text-[11px] text-slate-500">{date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 px-4 rounded-xl bg-slate-950/40 border border-dashed border-slate-800 space-y-3">
                <Stethoscope className="w-8 h-8 text-slate-600 mx-auto" />
                <div>
                  <p className="text-sm font-medium text-slate-300">No consultation records yet</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    When you evaluate symptoms using the checker, your assessments and recommended specialists will appear here.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('analyzer')}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium transition"
                >
                  Start Symptom Check
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Quick Actions & Helpline */}
        <div className="space-y-6">
          
          {/* Quick Actions */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-3">Quick Navigation</h3>
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('analyzer')}
                className="w-full text-left p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-xs text-slate-200 flex items-center justify-between transition"
              >
                <div className="flex items-center gap-2.5">
                  <Stethoscope className="w-4 h-4 text-sky-400" />
                  <span>Check New Symptoms</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>

              <button
                onClick={() => setActiveTab('history')}
                className="w-full text-left p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-xs text-slate-200 flex items-center justify-between transition"
              >
                <div className="flex items-center gap-2.5">
                  <History className="w-4 h-4 text-sky-400" />
                  <span>View All History</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className="w-full text-left p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-xs text-slate-200 flex items-center justify-between transition"
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-sky-400" />
                  <span>My Profile Details</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Emergency Contact Information */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-rose-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <h4 className="font-bold text-sm text-white">Emergency Services</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              If you or someone around you is experiencing life-threatening symptoms, call emergency services immediately.
            </p>
            <div className="pt-2 space-y-2">
              <div className="p-3 rounded-xl bg-slate-800/60 flex items-center justify-between text-xs">
                <span className="text-slate-300">National Emergency</span>
                <a href="tel:112" className="font-bold text-rose-400 hover:text-rose-300">112</a>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 flex items-center justify-between text-xs">
                <span className="text-slate-300">Ambulance Service</span>
                <a href="tel:102" className="font-bold text-rose-400 hover:text-rose-300">102</a>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'analyzer':
        return <SymptomAnalyzer onAnalysisComplete={loadHistory} />;
      case 'history':
        return <AnalysisHistory onHistoryChange={loadHistory} />;
      case 'records':
        return <MedicalRecords />;
      case 'settings':
        return <Setting />;
      case 'profile':
        return <Profile />;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 font-sans overflow-hidden text-slate-200">
      
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-slate-900 flex flex-col transition-transform duration-200 ease-in-out border-r border-slate-800
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-sky-600 text-white">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-tight">Medora</span>
              <span className="block text-[10px] text-slate-400 font-medium leading-none">Healthcare</span>
            </div>
          </div>
          <button 
            className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-5 px-3 space-y-1">
          <p className="px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Menu</p>
          <NavItem id="overview" icon={LayoutDashboard} label="Dashboard" />
          <NavItem id="analyzer" icon={Stethoscope} label="Symptom Checker" />
          <NavItem id="history" icon={History} label="Consultation History" count={history.length} />
          <NavItem id="records" icon={FileText} label="Medical Records" />
          
          <p className="px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider pt-6 mb-2">Account</p>
          <NavItem id="profile" icon={User} label="Profile" />
          <NavItem id="settings" icon={Settings} label="Settings" />
        </div>

        {/* Patient Profile Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div 
            onClick={() => {
              setActiveTab('profile');
              setMobileMenuOpen(false);
            }}
            className="p-2 rounded-xl hover:bg-slate-800/80 transition cursor-pointer flex items-center gap-3"
          >
            <div className="h-9 w-9 rounded-lg bg-sky-600/20 text-sky-400 border border-sky-500/30 flex items-center justify-center font-bold text-sm shrink-0">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="truncate flex-1">
              <p className="text-xs font-semibold text-white truncate">{displayName}</p>
              <p className="text-[11px] text-slate-400 truncate">{user?.email || 'Patient'}</p>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full mt-2 flex items-center justify-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm flex items-center justify-between px-6 lg:px-10 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              className="p-1.5 lg:hidden text-slate-400 hover:text-white rounded-lg"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-base font-bold text-white capitalize">
              {activeTab === 'overview' ? 'Patient Overview' : 
               activeTab === 'analyzer' ? 'Symptom Assessment' :
               activeTab === 'history' ? 'Consultation History' :
               activeTab === 'records' ? 'Medical Records Vault' :
               activeTab === 'profile' ? 'Patient Profile' : 'Settings'}
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="hidden sm:inline">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <div className="h-2 w-2 rounded-full bg-emerald-400" title="Connected" />
          </div>
        </header>

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto px-6 lg:px-10 py-6">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

    </div>
  );
};

export default Dashboard;
