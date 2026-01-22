import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, Lock } from 'lucide-react';

const Login = () => {
    const [role, setRole] = useState('student');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        login(role);
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="bg-slate-900 p-8 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl mb-4">
                        <GraduationCap className="text-slate-900" size={24} />
                    </div>
                    <h1 className="text-white text-xl font-bold tracking-widest uppercase">Campus Portal</h1>
                    <p className="text-slate-400 text-xs mt-2 uppercase tracking-widest font-medium">University Login System</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="flex bg-slate-50 p-1 rounded-xl mb-8">
                            <button
                                type="button"
                                onClick={() => setRole('student')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all ${role === 'student' ? 'bg-white shadow-sm text-slate-900 border border-slate-100' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                <GraduationCap size={16} /> Student
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('teacher')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all ${role === 'teacher' ? 'bg-white shadow-sm text-slate-900 border border-slate-100' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                <BookOpen size={16} /> Faculty
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="ID Number"
                                    className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                                    required
                                />
                                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-sm tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 active:scale-[0.98]"
                        >
                            SIGN IN
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <a href="#" className="text-xs text-slate-400 hover:text-slate-900 transition-colors">Forgot your password?</a>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <a href="#" className="hover:text-slate-900 transition-colors">Support</a>
                <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            </div>
        </div>
    );
};

export default Login;
