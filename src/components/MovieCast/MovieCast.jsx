import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import css from "./MovieCast.module.css"

export default function MovieCast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);

    useEffect(() => {
    const fetchCast = async () => {
        try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
            headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzQzNmI2NjZlY2ViNjhhNmE3ZmE0NGU2ZDMzMTg1NCIsIm5iZiI6MTcyMDgwMDk2NC45MDA4NTYsInN1YiI6IjY2OTAxZTVkNjM0Mjc4YTA4ZDhiMWNiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yeD48RcrsxyboOoo2YXGzdeoGYORvmDq8IN9VXOw0-I'
            }
        });
        setCast(response.data.cast);
        } catch (error) {
        console.error('Failed to fetch cast:', error);
        }
    };

    fetchCast();
    }, [movieId]);

    return (
    <div>
        <ul className={css.ul}>
        {cast.map(member => (
            <li key={member.cast_id} className={css.li}>
            <img 
                src={`https://image.tmdb.org/t/p/w200${member.profile_path}`} 
                alt={member.name} 
                width="50"
                height="75"
            />
            {member.name}, {member.character}
            </li>
        ))}
        </ul>
    </div>
    );
}
