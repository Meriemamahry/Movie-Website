// Favorite.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './Home';
import '../style/Favorite.css';

const Favorite = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteMovieDetails, setFavoriteMovieDetails] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    setFavoriteMovies(storedFavorites);

    const fetchFavoriteMovieDetails = async () => {
      const promises = storedFavorites.map(async (movieId) => {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=323e3fe5a8237f5319c4b400fb4bd2d9`
        );
        return response.data;
      });

      try {
        const favoriteDetails = await Promise.all(promises);
        setFavoriteMovieDetails(favoriteDetails);
      } catch (error) {
        console.error('Error fetching favorite movie details:', error);
      }
    };

    fetchFavoriteMovieDetails();
  }, []);

  const handleRemoveFromFavorite = (movieId) => {
    const updatedFavorites = favoriteMovies.filter((id) => id !== movieId);
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
    setFavoriteMovieDetails((prevDetails) => prevDetails.filter((movie) => movie.id !== movieId));
  };

  return (
    <>
      <div className='favourite'>
        <p className='title-fav'>Your Favorite Movies are Here...</p>
      </div>
      <h2 className='title2'>Favorite</h2>
      <div className="home-container">
        {favoriteMovieDetails.map((movie) => (
          <Home
            key={movie.id}
            title={movie.title}
            releaseDate={new Date(movie.release_date).getFullYear()}
            rating={movie.vote_average}
            posterPath={movie.poster_path}
            id={movie.id}
            isFavorite={true}
            onRemoveFromFavorite={() => handleRemoveFromFavorite(movie.id)}
          />
        ))}
      </div>
    </>
  );
};

export default Favorite;
