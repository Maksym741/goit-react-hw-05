import React, { useContext } from 'react';
import { SearchContext } from '../../components/contexts/SearchContext';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

export default function MoviesPage() {
    const { searchResults, setSearchResults, query, setQuery } = useContext(SearchContext);

    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzQzNmI2NjZlY2ViNjhhNmE3ZmE0NGU2ZDMzMTg1NCIsIm5iZiI6MTcyMDgwMDk2NC45MDA4NTYsInN1YiI6IjY2OTAxZTVkNjM0Mjc4YTA4ZDhiMWNiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yeD48RcrsxyboOoo2YXGzdeoGYORvmDq8IN9VXOw0-I'
            }
        });
        setSearchResults(response.data.results);
    };

    return (
        <div>
            <h1>MoviesPage</h1>
            <form onSubmit={handleSearch}>
                <input 
                    type="text"  
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                />
                <button type="submit">Search</button>
            </form>
            <MovieList movies={searchResults} />
        </div>
    );
}
