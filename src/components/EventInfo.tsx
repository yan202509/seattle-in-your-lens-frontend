import type { Event } from '../types';

interface EventInfoProps {
    event: Event;
}

export function EventInfo({ event }: EventInfoProps) {
    const formattedDate = new Date(event.event_date).toLocaleString([], { 
        year: 'numeric',
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    return (
        <div className="event-info-block">
            <p className="date-line">{formattedDate}</p>
            <div className="details-line">
                {event.event_season} | {event.event_type} | $ {event.cost_level}
            </div>

        </div>
    );
}