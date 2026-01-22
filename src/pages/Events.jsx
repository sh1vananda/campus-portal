import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import { Calendar as CalendarIcon, MapPin, Clock, ExternalLink } from 'lucide-react';

const eventsList = [
    {
        id: 1,
        title: 'Global Tech Summit 2026',
        date: '2026-02-10',
        time: '10:00 AM - 04:00 PM',
        location: 'Main Auditorium',
        description: 'A gathering of tech enthusiasts and industry leaders discussing the future of AI and Robotics.',
        category: 'Academic',
        type: 'In-person'
    },
    {
        id: 2,
        title: 'Inter-Departmental Sports Meet',
        date: '2026-02-15',
        time: '08:00 AM - 06:00 PM',
        location: 'University Sports Complex',
        description: 'Annual sports competition between all academic departments.',
        category: 'Sports',
        type: 'In-person'
    },
    {
        id: 3,
        title: 'Spring Music Festival',
        date: '2026-03-05',
        time: '05:00 PM - 10:00 PM',
        location: 'Open Air Theater',
        description: 'A night of music, art, and food to celebrate the arrival of spring.',
        category: 'Cultural',
        type: 'In-person'
    },
    {
        id: 4,
        title: 'Webinar: Sustainable Engineering',
        date: '2026-03-12',
        time: '02:00 PM - 03:30 PM',
        location: 'Online (Zoom)',
        description: 'Expert-led discussion on modern practices in sustainable infrastructure.',
        category: 'Webinar',
        type: 'Virtual'
    }
];

const Events = () => {
    return (
        <div className="py-8">
            <PageHeader
                title="Events"
                subtitle="Stay updated with the latest campus activities and events."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {eventsList.map((event) => (
                    <div key={event.id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm shadow-slate-200/50 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="px-3 py-1 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-widest">
                                {event.category}
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                {event.type}
                            </div>
                        </div>

                        <h3 className="text-xl font-black text-slate-900 mb-3">{event.title}</h3>
                        <p className="text-sm text-slate-500 mb-6 line-clamp-2">{event.description}</p>

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
                                <span>{event.location}</span>
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
export { eventsList };
