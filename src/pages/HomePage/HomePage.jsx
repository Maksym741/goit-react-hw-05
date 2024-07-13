import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzQzNmI2NjZlY2ViNjhhNmE3ZmE0NGU2ZDMzMTg1NCIsIm5iZiI6MTcyMDgwMDk2NC45MDA4NTYsInN1YiI6IjY2OTAxZTVkNjM0Mjc4YTA4ZDhiMWNiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yeD48RcrsxyboOoo2YXGzdeoGYORvmDq8IN9VXOw0-I'
          }
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Failed to fetch trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending todey</h1>
      <MovieList movies={movies} />
    </div>
  );
}
