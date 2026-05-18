import React, { useEffect, useState } from 'react';
import  authStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import API from '../services/api.js';
import Setting from "../components/Setting.jsx";
import { 
  Activity, 
  Search,
  Bell, 
  LogOut, 
  User, 
  LayoutDashboard,
  Users,
  FileText,
  Pill,
  Stethoscope,
  History,
  Droplets,
  HeartPulse,
  Plus,
  ChevronRight,
  Menu,
  X,
  Settings
} from 'lucide-react';

import SymptomAnalyzer from '../components/SymptomAnalyzer';
import AnalysisHistory from '../components/AnalysisHistory';
import Profile from '../components/Profile';

const Dashboard = () => {
  const { user, logout, fetchProfile } = authStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  
 useEffect(() => {

    const token =
    localStorage.getItem(
        "token"
    );

    if (token) {

        fetchProfile();
    }

}, []);

 
  const handleLogout = () => {
    logout();
    navigate('/logout');
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return {
      month: d.toLocaleString('default', { month: 'short' }),
      day: d.getDate(),
      full: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    };
  };

  const NavItem = ({ id, icon: Icon, label }) => {
    const isActive = activeTab === id;
    return (
      <button
        onClick={() => {
          setActiveTab(id);
          setMobileMenuOpen(false);
        }}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
          isActive 
            ? 'bg-cyan-500/10 text-white shadow-[inset_4px_0_0_0_#06b6d4]' 
            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
        }`}
      >
        <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
        <span>{label}</span>
      </button>
    );
  };

  const renderOverview = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Right Stacked Cards */}
        <div className="flex flex-col gap-6">
          {/* Daily Health Tips */}
          <div className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-6 flex flex-col justify-center min-h-[140px]">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center shrink-0">
                <Plus className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Daily Health Tips</h4>
                <p className="text-sm text-slate-400 leading-relaxed">Eat a healthy breakfast. It jumpstarts your metabolism and stops you from overeating.</p>
              </div>
            </div>
          </div>

          {/* Hydration Reminder */}
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-6 text-white flex-1 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Droplets className="h-32 w-32" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-1">Hydration Reminder</h3>
              <p className="text-cyan-100 text-xs mb-6">You are doing great today!</p>
              
              <div className="flex items-baseline space-x-1 mb-2">
                <span className="text-4xl font-bold tracking-tight">1.8</span>
                <span className="text-sm font-medium text-cyan-100">/ 2.5 L</span>
              </div>
              
              <div className="w-full bg-black/20 rounded-full h-2 mb-6 overflow-hidden backdrop-blur-sm">
                <div className="bg-white h-full rounded-full" style={{ width: '72%' }}></div>
              </div>
              
              <button className="w-full py-2.5 bg-[#0f172a]/60 hover:bg-[#0f172a]/80 backdrop-blur-md transition-colors rounded-xl text-xs font-bold tracking-wider text-white border border-white/10">
                GOT IT
              </button>
            </div>
          </div>
        </div>
      </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'analyzer':
        return <div className="animate-in fade-in duration-300 bg-slate-800/40 border border-slate-700/50 backdrop-blur-xl p-6 rounded-3xl text-white"><SymptomAnalyzer /></div>;
      case 'history':
        return <div className="animate-in fade-in duration-300 text-white"><AnalysisHistory /></div>;
        case "settings":
        return <Setting />;
      case 'profile':
        return (
          <div className="animate-in fade-in duration-300 text-white">
            <Profile />
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="flex h-screen bg-[#0f172a] font-sans overflow-hidden text-slate-300">
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar: Navy/Black */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[#020617] flex flex-col transition-transform duration-300 ease-in-out border-r border-slate-800
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="h-20 flex items-center px-6">
          <Activity className="h-6 w-6 text-cyan-400 mr-2" />
          <span className="font-bold text-xl text-white tracking-wide">Medora</span>
          <button 
            className="ml-auto lg:hidden text-slate-500 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 mt-2">Main Menu</p>
          <NavItem id="overview" icon={LayoutDashboard} label="Dashboard" />
          <NavItem id="analyzer" icon={Stethoscope} label="AI Symptom Checker" />
          <NavItem id="history" icon={History} label="Analysis History" />
          <NavItem id="settings" icon={Settings} label="Settings" />
        </div>

        {/* Settings & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-1">
          {/* <button className="w-full flex items-center space-x-3 px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors">
            <Settings className="w-5 h-5 text-slate-500" />
            <span>Settings</span>
          </button> */}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-800/50 transition-colors"
          >
            <LogOut className="w-5 h-5 text-slate-500" />
            <span>Logout</span>
          </button>
          
          {/* User Profile Mini */}
          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center space-x-3 px-2">
             <div
                onClick={() => setActiveTab('profile')}
                className="h-10 w-10 rounded-full bg-cyan-900 border border-cyan-500/30 flex items-center justify-center shrink-0 cursor-pointer hover:bg-cyan-800 transition"
              >
                <User className="h-5 w-5 text-cyan-400" />
              </div>
             <div className="truncate">
                <p className="text-sm font-semibold text-white truncate">{user?.email?.split('@')[0] || 'User'}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{user?.role || 'Patient'}</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-24 flex items-center justify-between px-6 lg:px-10 z-30 shrink-0">
          <div className="flex items-center">
            <button 
              className="p-2 mr-4 lg:hidden text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="hidden sm:block">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">HEALTH PULSE</p>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Hi, {user?.email?.split('@')[0] || 'User'}! 👋
              </h1>
              <p className="text-xs text-slate-400 mt-1">Your personalized health overview is ready.</p>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-6 lg:px-10 pb-10">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

