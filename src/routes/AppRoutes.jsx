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
import Signup from '../pages/Signup';
import SignupTeacher from '../pages/SignupTeacher';
import CourseRegistration from '../pages/CourseRegistration';
import Profile from '../pages/Profile';
import Exams from '../pages/Exams';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import Help from '../pages/Help';
import Contact from '../pages/Contact';
import TeacherAssignmentCreate from '../pages/teacher/AssignmentCreate';
import TeacherAssignmentSubmissions from '../pages/teacher/AssignmentSubmissions';
import { useAuth } from '../context/AuthContext';
import ClassList from '../pages/teacher/classList';
import CourseAllocation from '../pages/teacher/CourseAllocation'
import AdminHome from '../pages/AdminHome';
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
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" replace />} />
            <Route path="/signup-teacher" element={!user ? <SignupTeacher /> : <Navigate to="/" replace />} />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }
            >
                {/* Index page changes based on role */}
                <Route index element={
                    user?.role === 'admin' ? <AdminHome /> :
                        user?.role === 'teacher' ? <FacultyHome /> :
                            <Home />
                } />

                {/* Common/Student Routes */}
                <Route path="attendance" element={<Attendance />} />
                <Route path="timetable" element={<Timetable />} />
                <Route path="grades" element={<Grades />} />
                <Route path="assignments" element={<Assignments />} />
                <Route path="fees" element={<Fees />} />
                <Route path="events" element={<Events />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="support" element={<Support />} />
                <Route path="registration" element={<CourseRegistration />} />
                <Route path="profile" element={<Profile />} />
                <Route path="exams" element={<Exams />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="terms" element={<Terms />} />
                <Route path="help" element={<Help />} />
                <Route path="contact" element={<Contact />} />

                {user?.role === 'teacher' && (
                    <>
                        <Route path="teacher/assignments/new" element={<TeacherAssignmentCreate />} />
                        <Route path="teacher/assignments/submissions" element={<TeacherAssignmentSubmissions />} />
                        <Route path="teacher/classlist" element={<ClassList />} />
                        <Route path="teacher/allotcourse" element={<CourseAllocation />} />
                    </>
                )}

                {user?.role === 'admin' && (
                    <>
                        {/* Admin specific routes will be added here */}
                        <Route path="admin" element={<AdminHome />} />
                    </>
                )}

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
