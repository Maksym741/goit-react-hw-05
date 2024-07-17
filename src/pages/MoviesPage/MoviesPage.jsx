import React, { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../components/contexts/SearchContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Toaster, toast } from 'react-hot-toast';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
    const { searchResults, setSearchResults, query, setQuery } = useContext(SearchContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [trendingMovies, setTrendingMovies] = useState([]);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzQzNmI2NjZlY2ViNjhhNmE3ZmE0NGU2ZDMzMTg1NCIsIm5iZiI6MTcyMDgwMDk2NC45MDA4NTYsInN1YiI6IjY2OTAxZTVkNjM0Mjc4YTA4ZDhiMWNiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yeD48RcrsxyboOoo2YXGzdeoGYORvmDq8IN9VXOw0-I'
                    }
                });
                setTrendingMovies(response.data.results);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch trending movies');
                toast.error('Failed to fetch trending movies');
                setLoading(false);
            }
        };

        fetchTrendingMovies();
    }, []);

    useEffect(() => {
        const queryParam = searchParams.get('query');
        if (queryParam) {
            setQuery(queryParam);
            handleSearch(queryParam);
        }
    }, [searchParams]);

    const handleSearch = async (searchQuery) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}`, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzQzNmI2NjZlY2ViNjhhNmE3ZmE0NGU2ZDMzMTg1NCIsIm5iZiI6MTcyMDgwMDk2NC45MDA4NTYsInN1YiI6IjY2OTAxZTVkNjM0Mjc4YTA4ZDhiMWNiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yeD48RcrsxyboOoo2YXGzdeoGYORvmDq8IN9VXOw0-I'
                }
            });
            setSearchResults(response.data.results);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch search results');
            toast.error('Failed to fetch search results');
            setLoading(false);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (query.trim() === '') {
            toast.error('Please enter a valid search query');
            return;
        }
        setSearchParams({ query });
    };

    return (
        <div className={css.container}>
            <Toaster />
            <form onSubmit={handleSearchSubmit}>
                <input 
                    type="text"  
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                />
                <button type="submit">Search</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <ErrorMessage message={error} />}
            {query && !loading && !error && (
                <div>
                    <MovieList movies={searchResults} />
                </div>
            )}
        </div>
    );
}



