import { useCallback, useEffect, useState } from 'react';

export const useAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAssignments = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('/api/assignments/submissions');
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson ? await response.json() : null;
            if (!response.ok) {
                throw new Error(data?.message || 'Failed to fetch assignments');
            }
            const list = Array.isArray(data) ? data : data?.assignments || [];
            setAssignments(list);
        } catch (err) {
            console.error('Error fetching assignments:', err);
            setError(err.message);
            setAssignments([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAssignments();
    }, [fetchAssignments]);

    const submitAssignment = useCallback(async ({ courseCode, rollNo, fileUrl }) => {
        const payload = { courseCode, rollNo, fileUrl };

        const response = await fetch('/api/assignments/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await response.json() : null;
        const fallbackText = !isJson ? await response.text() : '';

        if (!response.ok) {
            const message = data?.message || fallbackText || `Assignment submission failed (status ${response.status})`;
            throw new Error(message);
        }

        await fetchAssignments();
        return data;
    }, [fetchAssignments]);

    const fetchSubmissionById = useCallback(async (id) => {
        if (!id) return null;
        const response = await fetch(`/api/assignments/submissions/${id}`);
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await response.json() : null;

        if (!response.ok) {
            throw new Error(data?.message || 'Failed to fetch submission');
        }

        return data;
    }, []);

    const createAssignment = useCallback(async ({ title, description, dueDate, courseCode, teacherEmpId }) => {
        const payload = { title, description, dueDate, courseCode, teacherEmpId };

        // Basic client-side guardrails to avoid empty payloads that the API will reject.
        if (!payload.title || !payload.description || !payload.courseCode || !payload.teacherEmpId) {
            throw new Error('Title, description, course code, and teacher employee ID are required');
        }

        const response = await fetch('/api/assignments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await response.json() : null;
        const fallbackText = !isJson ? await response.text() : '';

        if (!response.ok) {
            const message = data?.message || fallbackText || `Failed to create assignment (status ${response.status})`;
            throw new Error(message);
        }

        await fetchAssignments();
        return data;
    }, [fetchAssignments]);

    return {
        assignments,
        loading,
        error,
        refresh: fetchAssignments,
        submitAssignment,
        fetchSubmissionById,
        createAssignment
    };
};
