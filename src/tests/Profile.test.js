import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testa a página do Profile', () => {
  it('Verifica se os elementos renderizados no Profile', () => {
    renderWithRouter(<App />, '/');

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btnenter = screen.getByRole('button', { name: /enter/i });
    expect(email && password && btnenter).toBeInTheDocument();

    userEvent.type(email, 'test@test.com');
    userEvent.type(password, '1234567');
    userEvent.click(btnenter);
    const btnProfile = screen.getByRole('link', {
      name: /profile/i,
    });
    expect(btnProfile).toBeInTheDocument();
    userEvent.click(btnProfile);
    const title = screen.getByTestId('page-title');
    const emailProfile = screen.getByTestId('profile-email');
    const btnOne = screen.getByTestId('profile-done-btn');
    const btnTwo = screen.getByTestId('profile-favorite-btn');
    const btnLogout = screen.getByTestId('profile-btnLogout-btn');
    expect(title && emailProfile && btnOne && btnTwo && btnLogout).toBeInTheDocument();
  });

  it('Verifica as  funcinalidades', () => {
    renderWithRouter(<App />, '/profile');
    const btnDoneRecipes = screen.getByTestId('profile-done-btn');
    userEvent.click(btnDoneRecipes);

    const titleDoneRecipes = screen.getByText(/done recipes/i);
    expect(titleDoneRecipes).toBeInTheDocument();

    const btnProfile = screen.getByRole('link', {
      name: /profile/i,
    });
    userEvent.click(btnProfile);

    const btnFavorite = screen.getByTestId('profile-favorite-btn');
    userEvent.click(btnFavorite);

    const titleFavorite = screen.getByText(/favorite recipes/i);
    expect(titleFavorite).toBeInTheDocument();

    const btnProfile2 = screen.getByTestId('profile-top-btn');
    userEvent.click(btnProfile2);

    const btnLogout = screen.getByTestId('profile-btnLogout-btn');
    userEvent.click(btnLogout);

    const login = screen.getByText(/login/i);
    expect(login).toBeInTheDocument();
  });
});
