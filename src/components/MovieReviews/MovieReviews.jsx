import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
    const fetchReviews = async () => {
        try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
            headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzQzNmI2NjZlY2ViNjhhNmE3ZmE0NGU2ZDMzMTg1NCIsIm5iZiI6MTcyMDgwMDk2NC45MDA4NTYsInN1YiI6IjY2OTAxZTVkNjM0Mjc4YTA4ZDhiMWNiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yeD48RcrsxyboOoo2YXGzdeoGYORvmDq8IN9VXOw0-I'
            }
        });
        setReviews(response.data.results);
        } catch (error) {
        console.error('Failed to fetch reviews:', error);
        }
    };

    fetchReviews();
    }, [movieId]);

    return (
    <div>
        <ul>
        {reviews.map(review => (
            <li key={review.id}>
            <p>{review.author}: {review.content}</p>
            </li>
        ))}
        </ul>
    </div>
    );
}
