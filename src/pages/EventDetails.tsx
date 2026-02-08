import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, deleteEvent } from '../api/axios';
import { ReviewForm } from '../components/ReviewForm';
import type { User, Event, Review } from '../types';
import { EventInfo } from '../components/EventInfo';

import './EventDetails.css';

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
        <div className="event-details-container"> 

            {currentUser && (currentUser.role === 'ADMIN' || (event.creator && currentUser.id === event.creator.id) ) && (
                <div className="mock-actions">
                    <p>Actions:</p>
                    <button className="delete-btn" onClick={handleDelete}>Delete Event</button>
                </div>
            )}
                <h1>{event.eventTitle}</h1>
                <p><strong>Created by:</strong> {event.creator?.username || "Someone mysterious"}</p>
                <p className="event-description">{event.event_description}</p>
                <EventInfo event={event} />

                <hr />
            <div className="reviews-list">
                <ReviewForm 
                    eventId={event.event_id} 
                    onReviewSuccess={handleNewReview} 
                />
                <hr />
                {event.reviews && event.reviews.length > 0 ? (
                    event.reviews.map((review) => (
                        <div key={review.id}>
                            <p>Rating: {review.rating}/5</p>
                            <p>{review.comment}</p>
                            <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
        </div>
    );
}

export default EventDetails;