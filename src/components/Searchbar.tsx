import React, { useState } from 'react';

import './Searchbar.css'

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [text, setText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(text); 
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                className="search-input"
                placeholder="Search by title"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="search-submit-btn">Search</button>
        </form>
    );
};

export default SearchBar;