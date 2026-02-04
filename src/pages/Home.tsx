import { useEffect, useState } from 'react';
import { getAllEvents, likeEvent, searchEvents  } from '../api/axios'; 
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import SearchBar from '../components/Searchbar';
import './Home.css';
import '../App.css';

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
    const location = useLocation();

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
    }, [location]);

    // search 
const handleSearch = async (searchQuery: string) => {
    try {
        const results = await searchEvents(searchQuery);
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
    <div className="sub-title-and-search">
        <h1>Your Next Adventure Starts Right Here</h1>
        
        {/* Use your component here! */}
        <SearchBar onSearch={(query) => handleSearch(query)} /> 
    </div>

        <div className="events-grid">
            {events.map((event) => (
                <div key={event.event_id} className="event-card-wrapper">
                    <Link to={`/event/${event.event_id}`} className="event-link">
                        <h3 className="event-title">{event.eventTitle}</h3>
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
