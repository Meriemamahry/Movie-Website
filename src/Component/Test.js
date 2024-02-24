// Test.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './Home';
import '../style/Test.css';

const Test = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showAllUpcomingMovies, setShowAllUpcomingMovies] = useState(true);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const loadUpcomingMovies = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/upcoming?api_key=323e3fe5a8237f5319c4b400fb4bd2d9'
      );

      setUpcomingMovies(response.data.results);

      if (response.data.results.length > 12) {
        setShowAllUpcomingMovies(false);
      } else {
        setShowAllUpcomingMovies(true);
      }
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
    }
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    setFavoriteMovies(storedFavorites);
    loadUpcomingMovies();
  }, []);

  useEffect(() => {
    const searchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=323e3fe5a8237f5319c4b400fb4bd2d9&query=${query}`
        );

        setMovies(response.data.results);
        setIsSearchActive(true);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    // Trigger searchMovies when query changes
    if (query.trim() !== '') {
      searchMovies();
    } else {
      // If query is empty, reset search
      setIsSearchActive(false);
      setMovies([]);
      loadUpcomingMovies();
    }
  }, [query]);

  const handleAddToFavorite = (movieId) => {
    const updatedFavorites = [...favoriteMovies, movieId];
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
    console.log('Updated favoriteMovies:', updatedFavorites);
  };

  const handleRemoveFromFavorite = (movieId) => {
    const updatedFavorites = favoriteMovies.filter((id) => id !== movieId);
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
    console.log('Updated favoriteMovies:', updatedFavorites);
  };

  return (
    <>
      <div className="search-bar">
        <div className='search'>
          <input
            type="text"
            placeholder="Search for your movie"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      {!isSearchActive && upcomingMovies.length > 0 && (
        <div className="upcoming-container">
          <h2 className="section-title">Upcoming Movies</h2>
          {upcomingMovies.length > 12 && (
            <button
              className="see-more-button"
              onClick={() => setShowAllUpcomingMovies(!showAllUpcomingMovies)}
            >
              {showAllUpcomingMovies ? "See Less" : "See More"}
            </button>
          )}
        </div>
      )}
      <div className="home-container">
        {!isSearchActive &&
          upcomingMovies
            .slice(0, showAllUpcomingMovies ? upcomingMovies.length : 6)
            .map((movie) => (
              <Home
                key={movie.id}
                title={movie.title}
                releaseDate={new Date(movie.release_date).getFullYear()}
                rating={movie.vote_average}
                posterPath={movie.poster_path}
                id={movie.id}
                isFavorite={favoriteMovies.includes(movie.id)}
                onAddToFavorite={() => handleAddToFavorite(movie.id)}
                onRemoveFromFavorite={() => handleRemoveFromFavorite(movie.id)}
              />
            ))}
        {movies.map((movie) => (
          <Home
            key={movie.id}
            title={movie.title}
            releaseDate={new Date(movie.release_date).getFullYear()}
            rating={movie.vote_average}
            posterPath={movie.poster_path}
            id={movie.id}
            isFavorite={favoriteMovies.includes(movie.id)}
            onAddToFavorite={() => handleAddToFavorite(movie.id)}
            onRemoveFromFavorite={() => handleRemoveFromFavorite(movie.id)}
          />
        ))}
      </div>
    </>
  );
};

export default Test;
