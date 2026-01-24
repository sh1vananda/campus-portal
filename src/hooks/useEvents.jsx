import { useState, useEffect } from 'react';

const initialEventsList = [
    {
        title: 'Global Tech Summit 2026',
        category: 'Academic',
        date: '2026-02-10',
        time: '10:00 AM - 04:00 PM',
        venue: 'Main Auditorium'
    },
    {
        title: 'Inter-Departmental Sports Meet',
        category: 'Sports',
        date: '2026-02-15',
        time: '08:00 AM - 06:00 PM',
        venue: 'University Sports Complex'
    },
    {
        title: 'Spring Music Festival',
        category: 'Cultural',
        date: '2026-03-05',
        time: '05:00 PM - 10:00 PM',
        venue: 'Open Air Theater'
    },
    {
        title: 'Webinar: Sustainable Engineering',
        category: 'Webinar',
        date: '2026-03-12',
        time: '02:00 PM - 03:30 PM',
        venue: 'Online (Zoom)'
    }
];

export const useEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // const response = await fetch('/api/events');
                // const data = await response.json();
                setEvents(initialEventsList);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const getUpcomingEvents = (limit = 3) => {
        return events
            .filter(event => new Date(event.date) >= new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, limit);
    };

    return {
        events,
        loading,
        getUpcomingEvents
    };
};
