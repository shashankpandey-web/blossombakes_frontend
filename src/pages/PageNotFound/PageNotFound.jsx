import React from 'react';
import { useNavigate } from 'react-router-dom';

import './PageNotFound.scss';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
      
        <h1 className="error-code">404</h1>
        <h2 className="error-message">Oops! This page is missing...</h2>
        <p className="error-description">
          The page you're looking for doesn't exist or has been moved.
          <br />
          But don't worry - we have plenty of delicious cakes waiting for you!
        </p>
        <div className="action-buttons">
         
          <button 
            className="home-button" 
            onClick={() => navigate('/')}
          >
            Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;