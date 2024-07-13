import React, { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzQzNmI2NjZlY2ViNjhhNmE3ZmE0NGU2ZDMzMTg1NCIsIm5iZiI6MTcyMDgwMDk2NC45MDA4NTYsInN1YiI6IjY2OTAxZTVkNjM0Mjc4YTA4ZDhiMWNiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yeD48RcrsxyboOoo2YXGzdeoGYORvmDq8IN9VXOw0-I'
                    }
                });
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        if (movieId) {
            fetchMovieDetails();
        }
    }, [movieId]);

    const handleGoBack = () => {
        if (location.state?.from) {
            navigate(location.state.from);
        } else {
            navigate('/movies');
        }
    };

    if (!movie) return <div>Loading...</div>;

    return (
        <div>
            <button onClick={handleGoBack}>Go back</button>
            <div className={css.container}>
                <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title} 
                    className={css.img}
                />
                <div className={css.title}>
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                </div>
            </div>
            <nav className={css.nav}>
                <Link to="cast" state={{ from: location.state?.from }}>Cast</Link>
                <Link to="reviews" state={{ from: location.state?.from }}>Reviews</Link>
            </nav>
            <Outlet />
        </div>
    );
}
