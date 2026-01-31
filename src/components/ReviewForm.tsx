import { useState } from 'react';
import { addReview } from '../api/axios';


interface Review {
    id: number;
    rating: number;
    comment: string;
    createdAt: string;
}

interface ReviewFormProps {
    eventId: number;
    onReviewSuccess: (newReview: Review) => void;
}

export function ReviewForm({ eventId, onReviewSuccess }: ReviewFormProps) {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const savedReview = await addReview(eventId, { 
                rating: rating, 
                comment: comment 
            });
            
            onReviewSuccess(savedReview);
            setComment(''); // Reset to empty
            setRating(5);   
        } catch (err) {
            console.error('Error posting review:', err);
            alert('Failed to post review');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Leave a Review</h3>
            <div>
                <label htmlFor="rating-select">Rating: </label>
                <select 
                    id="rating-select" 
                    name="rating"
                    value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                </select>
            </div>
            <br />
            <textarea
                id="comment-box"
                name="comment"
                placeholder="Write your comment here!!!!!!..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
            />
            <br />
            <button type="submit">Submit Review</button>
        </form>
    );
}