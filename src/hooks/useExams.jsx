import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export const useExams = () => {
    const { user } = useAuth();
    const [allExams, setAllExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExams = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/exams'); // Using VITE proxy
                if (!response.ok) throw new Error('Failed to fetch exams');
                const data = await response.json();
                setAllExams(data);
            } catch (err) {
                console.error('Error fetching exams:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExams();
    }, []);

    // Filter exams where the student is in the course.students list
    const studentExams = allExams.filter(exam =>
        exam.course?.students?.includes(user?.id)
    ).sort((a, b) => new Date(a.examDate) - new Date(b.examDate));

    const getNextExam = () => {
        const futureExams = studentExams.filter(exam => new Date(exam.examDate) >= new Date().setHours(0, 0, 0, 0));
        return futureExams.length > 0 ? futureExams[0] : null;
    };

    return {
        exams: studentExams,
        allExams, // Useful if we ever need the full list
        loading,
        error,
        getNextExam
    };
};
