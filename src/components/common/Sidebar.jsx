import {
    Home as HomeIcon,
    Calendar,
    Clock,
    FileText,
    CreditCard,
    User,
    TrendingUp,
    X,
    Ticket,
    ClipboardList,
    GraduationCap,
    CalendarDays,
    Activity
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const sidebarItems = [
    { name: 'Home', icon: HomeIcon, path: '/' },
    { name: 'Profile', icon: User, path: '/profile' },
    { name: 'Attendance', icon: Activity, path: '/attendance' },
    { name: 'Timetable', icon: Clock, path: '/timetable' },
    { name: 'Exams', icon: ClipboardList, path: '/exams' },
    { name: 'Assignments', icon: FileText, path: '/assignments' },
    { name: 'Academic Calendar', icon: CalendarDays, path: '/calendar' },
    { name: 'Events', icon: Calendar, path: '/events' },
    { name: 'Fee Payment', icon: CreditCard, path: '/fees' },
    { name: 'Course Regs', icon: GraduationCap, path: '/registration' },
    { name: 'Grades', icon: TrendingUp, path: '/grades' },
    { name: 'Ticketing Support', icon: Ticket, path: '/support' }
];

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <>
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            ></div>

            <aside className={`
        fixed top-0 left-0 bottom-0 z-40 w-72 bg-white transform transition-transform duration-300 ease-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="flex items-center justify-between px-6 h-16 border-b border-slate-100 flex-shrink-0">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">Navigation</span>
                    <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-slate-900">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
                    {sidebarItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={onClose}
                            className={({ isActive }) => `
                  flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-all
                  ${isActive
                                    ? 'bg-slate-900 text-white'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                `}
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                                    {item.name}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
