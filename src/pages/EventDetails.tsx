import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, deleteEvent } from '../api/axios';
import { ReviewForm } from '../components/ReviewForm';
import type { User, Event, Review } from '../types';


interface EventDetailsProps {
    currentUser: User | null;
}

function EventDetails({ currentUser }: EventDetailsProps) {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
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

    const handleDelete = async () => {
        if (!id || !window.confirm("Are you sure?")) return;
        try {
            await deleteEvent(id);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    // 2. This function adds the new review to the state so it appears immediately
    const handleNewReview = (newReview: Review) => {
        if (event) {
            setEvent({
                ...event,
                reviews: [newReview, ...(event.reviews || [])] // Puts new review at the top, and return empty array instead of null
            });
        }
    };

    if (!event) return <p>Loading event...</p>;

    return (
        <div> 

            {currentUser && (currentUser.role === 'ADMIN' || (event.creator && currentUser.id === event.creator.id) ) && (
                <div>
                    <p>Actions:</p>
                    <button onClick={() => navigate(`/edit/${event.event_id}`)}>Edit Event</button>
                    <button onClick={handleDelete}>Delete Event</button>
                </div>
            )}
        <h1>{event.event_title}</h1>
        <p>{event.event_description}</p>
        <p>
            {event.event_season} | {event.event_type} | {event.cost_level}
        </p>
        <p>{new Date(event.event_date).toLocaleString()}</p>
        <hr />
            
            <ReviewForm 
                eventId={event.event_id} 
                onReviewSuccess={handleNewReview} 
            />
            {event.reviews && event.reviews.length > 0 ? (
                event.reviews.map((review) => (
                    <div key={review.id}>
                        <p>Rating: {review.rating}/5</p>
                        <p>{review.comment}</p>
                        <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                        <br /><br />
                    </div>
                ))
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    );
}

export default EventDetails;