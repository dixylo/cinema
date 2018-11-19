import React from 'react';
import { Link } from 'react-router-dom';

export const Card = ({movieId, name, pic, category, roomId}) => (
  <div className='card'>
    <Link to={`/movie/${movieId}/${roomId}`}>
      <img alt={name} src={pic} style={{width: '100%', height: '444px'}} />
    </Link>    
    <div className='content'>
      <h4><b>{name}</b></h4>
      <p>{category}</p>
    </div>
  </div>
)