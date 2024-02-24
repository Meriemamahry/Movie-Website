// Categories.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './Home';
import '../style/categorie.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [movies, setMovies] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        // Fetch categories
        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/genre/movie/list?api_key=323e3fe5a8237f5319c4b400fb4bd2d9'
                );
                setCategories(response.data.genres);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        // Fetch movies based on selected category
        const fetchMovies = async () => {
            try {
                let url = 'https://api.themoviedb.org/3/discover/movie?api_key=323e3fe5a8237f5319c4b400fb4bd2d9';

                if (selectedCategory !== 'all') {
                    url += `&with_genres=${selectedCategory}`;
                }

                const response = await axios.get(url);
                setMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchCategories();
        fetchMovies();
    }, [selectedCategory]); // Trigger fetchMovies when selectedCategory changes

    useEffect(() => {
        // Sync favoriteMovies with local storage
        const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
        setFavoriteMovies(storedFavorites);
    }, []); // Load favoriteMovies from local storage on component mount

    const handleAddToFavorite = (movieId) => {
        setFavoriteMovies((prevFavorites) => {
            const updatedFavorites = [...prevFavorites, movieId];
            localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    const handleRemoveFromFavorite = (movieId) => {
        setFavoriteMovies((prevFavorites) => {
            const updatedFavorites = prevFavorites.filter((id) => id !== movieId);
            localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    return (
        <div>
            <div className='categorie'>
                <h2 className='cath2'>Choose your Category</h2>
            </div>
            <div className='categorieSelect'>
                <label htmlFor="category"></label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="all">All</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="home-container">
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
        </div>
    );
};

export default Categories;
