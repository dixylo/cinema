import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

export const Card = ({movieId, name, pic, category, roomId}) => (
  <div className='card'>
    <Link to={`/movie/${movieId}/${roomId}`}>
      <img alt={name} src={pic} />
    </Link>    
    <div className='content'>
      <h4><b>{name}</b></h4>
      <p>{category}</p>
    </div>
  </div>
)