import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
});


export const getAllEvents = () => api.get('/events').then(res => res.data);

export const getEventById = (id: string) => api.get(`/events/${id}`).then(res => res.data);


export const likeEvent = async (id: number) => {
    const response = await api.patch(`/events/${id}/like`);
    return response.data; 
};

// Fetch all reviews for a single event
export const getReviewsByEvent = (eventId: number) => 
    api.get(`/events/${eventId}/reviews`).then(res => res.data);

// Submit a new review
export const addReview = (eventId: number, reviewData: { rating: number; comment: string }) => 
    api.post(`/events/${eventId}/reviews`, reviewData).then(res => res.data);


// delete event along with all related comments
export const deleteEvent = async (id: string | number) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
};


export default api;
