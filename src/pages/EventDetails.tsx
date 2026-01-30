import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../api/axios';

interface Event {
    event_id: number;
    event_title: string;
    event_description: string;
    event_season: string;
    event_type: string;
    cost_level: string;
    event_date: string;
}

function EventDetails() {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchEvent = async () => {
        try {
            const data = await getEventById(id);
            setEvent(data);
        } catch (err) {
            console.error('Error fetching event:', err);
        }
        };

        fetchEvent();
    }, [id]);

    if (!event) return <p>Loading event...</p>;

    return (
        <div>
        <h1>{event.event_title}</h1>
        <p>{event.event_description}</p>
        <p>
            {event.event_season} | {event.event_type} | {event.cost_level}
        </p>
        <p>{new Date(event.event_date).toLocaleString()}</p>
        </div>
    );
}

export default EventDetails;
