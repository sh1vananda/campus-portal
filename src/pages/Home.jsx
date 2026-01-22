import React, { useState, useEffect } from 'react';
import PageHeader from '../components/layout/PageHeader';
import { initialAssignmentsList } from './Assignments';
import { eventsList } from './Events';
import { Calendar, Clock, ArrowRight, BookOpen, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

import campus1 from '../assets/images/campus1.png';
import campus2 from '../assets/images/campus2.png';
import campus3 from '../assets/images/campus3.png';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            image: campus1,
            title: 'State-of-the-Art Research Center',
            tag: 'Innovation'
        },
        {
            image: campus2,
            title: 'Modern & Collaborative Library',
            tag: 'Academic'
        },
        {
            image: campus3,
            title: 'Professional Sports Infrastructure',
            tag: 'Athletics'
        }
    ];

    // Auto-scroll carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="py-8 space-y-12">
            <PageHeader
                title="Welcome Back, Vimoh"
                subtitle="Here's what is happening on campus today."
            />

            {/* Top Section: Scrolling Carousel */}
            <section className="relative h-[400px] w-full overflow-hidden rounded-[40px] shadow-2xl shadow-indigo-200/50">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-12 left-12 text-white">
                            <span className="px-3 py-1 bg-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
                                {slide.tag}
                            </span>
                            <h2 className="text-4xl font-black tracking-tight">{slide.title}</h2>
                        </div>
                    </div>
                ))}

                {/* Carousel Indicators */}
                <div className="absolute bottom-12 right-12 flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-12 h-1 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-16' : 'bg-white/30 truncate'
                                }`}
                        ></button>
                    ))}
                </div>
            </section>

            {/* Bottom Section: Split Columns */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* Left Half: Upcoming Assignments */}
                <HomeListSection
                    title="Assignments"
                    subtitle="Due within the next 7 days"
                    link="/assignments"
                    items={initialAssignmentsList.filter(a => a.status !== 'submitted').slice(0, 3)}
                    renderItem={(assignment) => (
                        <div key={assignment.id} className="group flex gap-5 p-5 rounded-[24px] border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all cursor-pointer h-[110px]">
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex-shrink-0 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                                <BookOpen size={20} />
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start gap-2">
                                        <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">{assignment.title}</h4>
                                        <span className="flex-shrink-0 text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg uppercase tracking-widest">{assignment.weight}%</span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">{assignment.course}</p>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <Clock size={12} className="text-slate-300" />
                                    <span>Due {assignment.dueDate}</span>
                                </div>
                            </div>
                        </div>
                    )}
                />

                {/* Right Half: Upcoming Events */}
                <HomeListSection
                    title="Events"
                    subtitle="Don't miss out on campus life"
                    link="/events"
                    items={eventsList.slice(0, 3)}
                    renderItem={(event) => (
                        <div key={event.id} className="group flex gap-5 p-5 rounded-[24px] border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all cursor-pointer h-[110px]">
                            <div className="w-12 h-12 bg-slate-900 rounded-xl flex-shrink-0 flex items-center justify-center text-white group-hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-900/10">
                                <Bell size={20} />
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start gap-2">
                                        <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">{event.title}</h4>
                                        <span className="flex-shrink-0 text-[9px] font-black text-slate-400 border border-slate-100 px-2 py-0.5 rounded-lg uppercase tracking-widest">{event.category}</span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">{event.location}</p>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest">
                                    <Calendar size={12} className="text-indigo-600" />
                                    <span className="text-slate-900 font-black uppercase">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                    )}
                />
            </section>
        </div>
    );
};

// Internal Helper for Homepage symmetry
const HomeListSection = ({ title, subtitle, link, items, renderItem }) => (
    <div className="bg-white border border-slate-100 rounded-[40px] p-8 md:p-10 shadow-sm shadow-slate-200/50 flex flex-col h-full min-h-[520px]">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h3>
                <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
            </div>
            <Link to={link} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all group">
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

        <div className="space-y-4 flex-1">
            {items.map(renderItem)}
        </div>

        <Link to={link} className="mt-8 py-4 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-center text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all">
            See All {title}
        </Link>
    </div>
);

export default Home;
