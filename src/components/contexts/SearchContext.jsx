import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');

    return (
        <SearchContext.Provider value={{ searchResults, setSearchResults, query, setQuery }}>
            {children}
        </SearchContext.Provider>
    );
};
