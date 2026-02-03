import { useEffect, useState } from 'react';
import { getAllEvents, likeEvent, searchEvents  } from '../api/axios'; 
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface Event {
    event_id: number;
    eventTitle: string; 
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
    const [query, setQuery] = useState("");
    const location = useLocation();

    useEffect(() => {
        const fetchEvents = async () => {
        try {
            const response = await getAllEvents ();
            setEvents(response);
            setQuery("");
        } catch (err) {
            console.error('Error fetching events:', err);
        }
    };

    fetchEvents();
    }, [location]);

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
    <div className="home-container">
        <h1>Seattle In Your Lens</h1>
            {/* search form  */}
            <form onSubmit={handleSearch} className="search-form"> 
                <input 
                    placeholder="Search..." 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                />
                <button type="submit">Search</button>
            </form>

        <div className="events-grid">
            {events.map((event) => (
                <div key={event.event_id}>
                    <Link to={`/event/${event.event_id}`} className="event-link">
                        <h3>{event.eventTitle}</h3>
                        <p className="description">{event.event_description}</p>
                        <div className="details">
                            {event.event_season} | {event.event_type} | {event.cost_level}
                        </div>
                        <p>{new Date(event.event_date).toLocaleString()}</p>
                        <button className="like-btn" onClick={(e) => handleLike(e, event.event_id)}>
                                💚 {event.likes}
                            </button>
                    </Link>

                </div>
    ))}
        </div>
    </div>
    );
}

export default Home;
