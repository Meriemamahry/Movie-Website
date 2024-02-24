import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../style/About.css';
import { BsStarFill } from 'react-icons/bs';

const About = () => {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                if (id && id !== ':id') {
                    // Fetch details for the specific movie if id is present
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/movie/${id}?api_key=323e3fe5a8237f5319c4b400fb4bd2d9&append_to_response=genres`
                    );
                    setMovies([response.data]);
                } else {
                    // Fetch details for two random movies
                    const response1 = await axios.get(
                        'https://api.themoviedb.org/3/movie/popular?api_key=323e3fe5a8237f5319c4b400fb4bd2d9'
                    );
                    const response2 = await axios.get(
                        'https://api.themoviedb.org/3/movie/top_rated?api_key=323e3fe5a8237f5319c4b400fb4bd2d9'
                    );

                    // Combine the two responses
                    setMovies([response1.data.results[0], response2.data.results[0]]);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <div key={movie.id} className='movieDetails'>
                    <div className='movieDImage'>
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={`${movie.title} Poster`}
                        />
                    </div>
                    <div className='movieDInfo'>
                        <h1 style={{ color: 'white' }}>{movie.title}</h1>
                        <p>
                            <BsStarFill size={15} style={{ color: 'yellow' }} /> {movie.vote_average}
                        </p>
                        {movie.genres && <p>{movie.genres.map((genre) => genre.name).join(', ')}</p>}
                        <p style={{ color: 'white' }}>{movie.overview}</p>
                        
                    </div>
                </div>
            ))}
        </div>
    );
};

export default About;
