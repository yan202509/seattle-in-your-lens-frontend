
export interface User {
    id: number;
    username: string;
    role: string;
}

export interface Review {
    id: number;
    rating: number;
    comment: string;
    createdAt: string; // or Date
}

export interface Event {
    event_id: number;
    eventTitle: string;
    eventDescription: string;
    event_season: string;
    event_type: string;
    cost_level: string;
    event_date: string;
    reviews: Review[];
    creator: User | null;
}