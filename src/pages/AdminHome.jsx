import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import { Users, BookOpen, Calendar, ShieldCheck, Activity } from 'lucide-react';

const AdminHome = () => {
    return (
        <div className="py-8 space-y-8 uppercase">
            <PageHeader
                title="Admin Terminal"
                subtitle="System management and infrastructure control."
            />

            <div className="bg-slate-900 rounded-[40px] p-20 text-white min-h-[400px] flex flex-col justify-center items-center text-center border border-white/10 shadow-2xl">
                <ShieldCheck size={64} className="text-indigo-400 mb-8 animate-pulse" />
                <h3 className="text-3xl font-black mb-4 tracking-tighter">Control Center Active</h3>
                <p className="text-slate-400 max-w-md font-bold text-xs leading-loose tracking-widest uppercase opacity-60">
                    The administrative management interface is currently empty.
                    Backend integration is required to populate system metrics and user controls.
                </p>
            </div>
        </div>
    );
};

export default AdminHome;
