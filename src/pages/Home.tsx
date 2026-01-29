import { useEffect, useState } from 'react';
// import api from '../api/axios';
import { getAllEvents  } from '../api/axios'; 
// import api, { getAllEvents, deleteEvent } from '../api/axios'; 

interface Event {
    event_id: number;
    event_title: string;
    event_description: string;
    event_season: string;
    event_type: string;
    created_at: string;
    cost_level: string;
    event_date: string;  
}

function Home() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
        try {
            const response = await getAllEvents ();
            setEvents(response);
        } catch (err) {
            console.error('Error fetching events:', err);
        }
    };

    fetchEvents();
    }, []);

    return (
    <div>
        <h1>Seattle In Your Lens</h1>
{events.map((event) => (
    <div key={event.event_id}>
    <h3>{event.event_title}</h3>
    <p>{event.event_description}</p>
    <p>
        {event.event_season} | {event.event_type} | {event.cost_level}
    </p>
    <p>{new Date(event.event_date).toLocaleString()}</p>
    </div>
))}
    </div>
    );
}

export default Home;
