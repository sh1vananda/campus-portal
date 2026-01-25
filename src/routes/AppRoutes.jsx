import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Home from '../pages/Home';
import FacultyHome from '../pages/FacultyHome';
import Login from '../pages/Login';
import Attendance from '../pages/Attendance';
import Timetable from '../pages/Timetable';
import Grades from '../pages/Grades';
import Assignments from '../pages/Assignments';
import Fees from '../pages/Fees';
import Events from '../pages/Events';
import Calendar from '../pages/Calendar';
import Support from '../pages/Support';
import Registration from '../pages/Registration';
import Profile from '../pages/Profile';
import Exams from '../pages/Exams';
import { useAuth } from '../context/AuthContext';

const AppRoutes = () => {
    const { user } = useAuth();

    // Protected Route component
    const ProtectedRoute = ({ children }) => {
        if (!user) return <Navigate to="/login" replace />;
        return children;
    };

    return (
        <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
            <Route path="/registration" element={!user ? <Registration /> : <Navigate to="/" replace />} />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }
            >
                {/* Index page changes based on role */}
                <Route index element={user?.role === 'teacher' ? <FacultyHome /> : <Home />} />

                {/* Common/Student Routes */}
                <Route path="attendance" element={<Attendance />} />
                <Route path="timetable" element={<Timetable />} />
                <Route path="grades" element={<Grades />} />
                <Route path="assignments" element={<Assignments />} />
                <Route path="fees" element={<Fees />} />
                <Route path="events" element={<Events />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="support" element={<Support />} />
                <Route path="profile" element={<Profile />} />
                <Route path="exams" element={<Exams />} />

                {/* Catch-all */}
                <Route path="*" element={
                    <div className="flex flex-col items-center justify-center min-h-[60vh]">
                        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">404 - Page Not Found</h2>
                        <p className="text-slate-500 mt-2">The module you are looking for doesn't exist yet.</p>
                    </div>
                } />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
