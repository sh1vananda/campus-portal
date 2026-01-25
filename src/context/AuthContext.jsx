import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: '69743ac87b5e9ca2726cbaa3',
        name: 'Vimoh Sharma',
        role: 'student',
        email: 'vimoh.sharma@university.edu'
    });

    const login = async (email, password) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role: 'student' })
            });

            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson ? await response.json() : null;

            if (!response.ok) {
                throw new Error(data?.message || `Server Error: ${response.status}`);
            }

            const userData = {
                id: data.userId,
                role: data.role,
                name: data.name || 'Student',
                email: email
            };

            setUser(userData);
            localStorage.setItem('portal_user', JSON.stringify(userData));
            return userData;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const registerStudent = async (studentData) => {
        try {
            const response = await fetch('/api/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: studentData.name,
                    email: studentData.email,
                    password: studentData.password,
                    department: studentData.department,
                    currentYear: studentData.currentYear || '1',
                    address: studentData.address || ''
                })
            });

            const isJson = response.headers.get('content-type')?.includes('application/json');

            if (!response.ok) {
                const errorData = isJson ? await response.json() : null;
                const errorText = !isJson ? await response.text() : '';
                throw new Error(errorData?.message || `Registration failed: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('portal_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, registerStudent }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
