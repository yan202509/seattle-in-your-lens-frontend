import { useEffect, useState } from 'react';
import { getAllEvents, likeEvent, searchEvents  } from '../api/axios'; 
import { Link } from 'react-router-dom';

interface Event {
    event_id: number;
    eventTitle: string; // quick fix for this project
    eventDescription: string; 
    event_season: string;
    event_type: string;
    created_at: string;
    cost_level: string;
    event_date: string;  
    likes: number;
}

function Home() {
    const [events, setEvents] = useState<Event[]>([]);
    const [query, setQuery] = useState("");

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

    // search 
    const handleSearch = async (e: React.FormEvent) => {
            e.preventDefault();
            try {
                const results = await searchEvents(query);
                setEvents(results);
            } catch (err) {
                console.error('Search failed', err);
            }
        };


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

        {/* ADDED: Simple search form */}
            <form onSubmit={handleSearch}>
                <input 
                    placeholder="Search..." 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                />
                <button type="submit">Search</button>
            </form>


        {events.map((event) => (
            <div key={event.event_id}>
                <Link to={`/event/${event.event_id}`}>
                    <h3>{event.eventTitle}</h3>
                    <p>{event.eventDescription}</p>
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
