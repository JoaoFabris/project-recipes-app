import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const storage = JSON.parse(localStorage.getItem('user'));
  const emailStorage = storage?.email || 'Nenhum usuário encontrado';
  const history = useHistory();

  const clickDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const clickFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header>
        Profile
      </Header>

      <h2 data-testid="profile-email">{emailStorage}</h2>

      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ clickDoneRecipes }
      >
        Done Recipes
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ clickFavoriteRecipes }
      >
        Favorite Recipes
      </button>

      <button
        type="button"
        data-testid="profile-btnLogout-btn"
        onClick={ handleLogout }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}
