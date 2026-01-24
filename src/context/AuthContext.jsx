import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Unlinked for now: Defaulting to a logged-in student so the portal is accessible directly.
    const [user, setUser] = useState({
        id: '69743ac87b5e9ca2726cbaa3',
        name: 'Vimoh Sharma',
        role: 'student',
        email: 'vimoh.sharma@university.edu'
    });

    const login = (role) => {
        setUser({
            id: role === 'student' ? '69743ac87b5e9ca2726cbaa3' : '69723ecab0b777f533866905',
            name: role === 'student' ? 'Vimoh Sharma' : 'Dr. Smith',
            role: role,
            email: role === 'student' ? 'vimoh.sharma@university.edu' : 'smith.teacher@university.edu'
        });
    };

    const logout = () => {
        // For now, logout just resets to default student to keep the portal "unlinked"
        setUser({
            id: '69743ac87b5e9ca2726cbaa3',
            name: 'Vimoh Sharma',
            role: 'student',
            email: 'vimoh.sharma@university.edu'
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
