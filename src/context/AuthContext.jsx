import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Unlinked for now: Defaulting to a logged-in student so the portal is accessible directly.
    const [user, setUser] = useState({
        name: 'John Doe',
        role: 'student',
        email: 'john.doe@university.edu'
    });

    const login = (role) => {
        setUser({
            name: role === 'student' ? 'John Doe' : 'Dr. Smith',
            role: role,
            email: role === 'student' ? 'john.doe@university.edu' : 'smith.teacher@university.edu'
        });
    };

    const logout = () => {
        // For now, logout just resets to default student to keep the portal "unlinked"
        setUser({
            name: 'John Doe',
            role: 'student',
            email: 'john.doe@university.edu'
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
