import { useEffect, useState } from 'react';
import { getAllEvents, likeEvent  } from '../api/axios'; 
import { Link } from 'react-router-dom';

interface Event {
    event_id: number;
    event_title: string;
    event_description: string;
    event_season: string;
    event_type: string;
    created_at: string;
    cost_level: string;
    event_date: string;  
    likes: number;
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

    const handleLike = async (e: React.MouseEvent, id: number) => {
        // These two lines prevent the Link from opening when the button is clicked
        e.preventDefault();
        e.stopPropagation();
        
        try {
            const updatedEvent = await likeEvent(id);
            setEvents(prevEvents => 
                prevEvents.map(event => 
                    event.event_id === id ? updatedEvent : event
                )
            );
        } catch (err) {
            console.error('Error liking event:', err);
        }
    };



    return (
    <div>
        <h1>Seattle In Your Lens</h1>
        {events.map((event) => (
            <div key={event.event_id}>
                <Link to={`/event/${event.event_id}`}>
                    <h3>{event.event_title}</h3>
                    <p>{event.event_description}</p>
                    <p>
                        {event.event_season} | {event.event_type} | {event.cost_level}
                    </p>
                    <p>{new Date(event.event_date).toLocaleString()}</p>
                    <button onClick={(e) => handleLike(e, event.event_id)}>
                            Like {event.likes}
                        </button>
                </Link>

            </div>
))}
    </div>
    );
}

export default Home;
