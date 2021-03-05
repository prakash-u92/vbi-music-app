import React from 'react';
import logo from '../visualbi-logo.png';

const AppHeader = () => {
  const goToWebsite = () => {
    window.open('https://visualbi.com/');
  };
  return (
	  <header className="app-header">
      <div className="logo-container">
        <img onClick={goToWebsite} src={logo} className="app-logo" alt="logo" />
      </div>
      <div className="app-name">
        <p className="title">VBI Music App</p>
      </div>
    </header>
  );
};

export { AppHeader as Header }