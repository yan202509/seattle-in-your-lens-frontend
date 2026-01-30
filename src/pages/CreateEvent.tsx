import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function CreateEvent() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateTime, setDateTime] = useState(''); 
    const [season, setSeason] = useState(''); 
    const [indoorOutdoor, setIndoorOutdoor] = useState(''); 
    const [costLevel, setCostLevel] = useState(''); 

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const response = await api.post('/events', {
        event_title: title,
        event_description: description,
        event_season: season,
        event_type: indoorOutdoor,
        cost_level: costLevel,
        event_date: dateTime, 
        });

        console.log('Event created:', response.data);
        alert('Event submitted successfully! Now return to HOME Page');


        setTitle('');
        setDescription('');
        setDateTime('');
        setSeason('');
        setIndoorOutdoor('');
        setCostLevel('');

    navigate('/');
    } catch (error) {
        console.error('Error submitting event:', error);
        alert('Failed to submit event.');
    }
    };

    return (
    <div>
        <h1>Create Event</h1>
        <form onSubmit={handleSubmit}>
        <div>
            <label>Title:</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
        </div>

        <div>
            <label>Description:</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
        </div>

        <div>
            <label>Date & Time:</label>
            <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                required
            />
            </div>

        <div>
            <label>Season:</label>
            <select value={season} onChange={(e) => setSeason(e.target.value)} required>
                <option value="">Select Season</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Autumn">Autumn</option>
                <option value="Winter">Winter</option>
            </select>
        </div>

        <div>
            <label>Indoor / Outdoor:</label>
            <select value={indoorOutdoor} onChange={(e) => setIndoorOutdoor(e.target.value)} required>
                <option value="">Select Type</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
            </select>
        </div>

        <div>
            <label>Cost Level:</label>
            <select value={costLevel} onChange={(e) => setCostLevel(e.target.value)} required>
                <option value="">Select Cost Level</option>
                <option value="Free">Free</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
        </div>

        <button type="submit">Submit Event</button>
        </form>
    </div>
    );
}

export default CreateEvent;
