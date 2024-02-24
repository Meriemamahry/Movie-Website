// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Home.css';
import { BiCalendar } from 'react-icons/bi';
import { BsStarFill, BsHeart, BsHeartFill } from 'react-icons/bs';

const Home = ({ title, releaseDate, rating, posterPath, id,  isFavorite,onAddToFavorite, onRemoveFromFavorite }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${posterPath}`;

  return (
    <div className="home">
      {posterPath && (
        <Link to={`about/${id}`}>
          <img src={imageUrl} alt={title} style={{ maxWidth: '100%' }} />
        </Link>
      )}
      <div className="info-container">
        <div className="title">{title}</div>
        <div className="date">
          <BiCalendar size={15} />
          {" " + releaseDate}
        </div>
        <div className="rating">
          <BsStarFill size={15} style={{ color: 'yellow' }} />
          {" " + rating}
        </div>
        <button 
          className='heart'
          onClick={isFavorite ? onRemoveFromFavorite : onAddToFavorite}
          style={{ color: isFavorite ? 'red' : 'gray' }}
        >
          {isFavorite ? <BsHeartFill size={18} /> : <BsHeart size={18} />}
        </button>
      </div>
    </div>
  );
};

export default Home;
