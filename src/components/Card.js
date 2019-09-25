import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ movieId, name, portrait, category, roomId }) => (
  <div className='card'>
    <Link to={`/movie/${movieId}/${roomId}`}>
      <img alt={name} src={portrait} />
    </Link>    
    <div className='content'>
      <h4><b>{name}</b></h4>
      <p>{category}</p>
    </div>
  </div>
);

export default Card;