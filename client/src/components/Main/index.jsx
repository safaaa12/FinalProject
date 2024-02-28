import React from 'react';

const Main = ({ user }) => {
  return (
    <div className="home-page">
      <header>
        <h1>Welcome to My React App </h1>
      </header>
      <main>
        <p>This is the homepage of the application.</p>
        <p>Feel free to explore and enjoy!</p>
      </main>
      <footer>
        <p>&copy; 2024 My React App</p>
      </footer>
    </div>
  );
};

export default Main;
