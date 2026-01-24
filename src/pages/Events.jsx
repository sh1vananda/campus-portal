import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import { Calendar as CalendarIcon, MapPin, Clock, ExternalLink } from 'lucide-react';
import { useEvents } from '../hooks/useEvents';

const Events = () => {
    const { events, loading } = useEvents();

    if (loading) {
        return (
            <div className="py-8 flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="py-8">
            <PageHeader
                title="Events"
                subtitle="Stay updated with the latest campus activities and events."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                    <div key={event.title} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm shadow-slate-200/50 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="px-3 py-1 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-widest">
                                {event.category}
                            </div>
                        </div>

                        <h3 className="text-xl font-black text-slate-900 mb-6">{event.title}</h3>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-slate-600 text-sm">
                                <CalendarIcon size={16} className="text-slate-400" />
                                <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600 text-sm">
                                <Clock size={16} className="text-slate-400" />
                                <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600 text-sm">
                                <MapPin size={16} className="text-slate-400" />
                                <span>{event.venue}</span>
                            </div>
                        </div>

                        <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                            REGISTER NOW <ExternalLink size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
