import { Link } from 'react-router-dom';

const Footer = () => {
    const footerLinks = [
        {
            title: 'Academic',
            links: [
                { name: 'Courses', path: '/registration' },
                { name: 'Calendar', path: '/calendar' },
                { name: 'Exams', path: '/exams' },
                { name: 'Assignments', path: '/assignments' }
            ]
        },
        {
            title: 'Services',
            links: [
                { name: 'Finance', path: '/fees' },
                { name: 'IT Support', path: '/support' },
                { name: 'Attendance', path: '/attendance' },
                { name: 'Grades', path: '/grades' }
            ]
        },
        {
            title: 'University',
            links: [
                { name: 'Profile', path: '/profile' },
                { name: 'About', path: '#' },
                { name: 'Contact', path: '#' },
                { name: 'Privacy', path: '#' }
            ]
        }
    ];

    return (
        <footer className="w-full bg-slate-900 text-white py-16 px-6 mt-auto">
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                {/* Centered Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center w-full mb-16">
                    {footerLinks.map((section) => (
                        <div key={section.title} className="flex flex-col items-center">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-slate-400">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.path}
                                            className="text-xs text-slate-400 hover:text-white transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Centered Bottom Bar */}
                <div className="pt-8 border-t border-slate-800 w-full flex flex-col items-center gap-6">
                    <div className="flex items-center gap-2 opacity-50">
                        <div className="w-4 h-4 bg-white rounded-sm"></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Campus Portal</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] font-medium text-slate-500 uppercase tracking-widest">
                        <p>© {new Date().getFullYear()} University</p>
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Help</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
