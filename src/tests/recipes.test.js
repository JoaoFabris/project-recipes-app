import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import mealCategories from '../../cypress/mocks/mealCategories';

describe('Testando componentes de Recipes', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mealCategories),
    }));
  });
  afterEach(() => jest.clearAllMocks());
  test('testa se botões de filtros do meal aparecem na tela', async () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox');
    const passInput = screen.getByTestId('password-input');
    const btnSubmit = screen.getByRole('button', { name: /enter/i });
    userEvent.type(emailInput, 'vasconaseriaa@gmail.com');
    userEvent.type(passInput, '12345678');
    userEvent.click(btnSubmit);
    const btnBeef = await screen.findByRole('button', { name: /beef/i });
    const btnCategory = screen.getByTestId('All-category-filter');
    expect(btnBeef).toBeInTheDocument();
    userEvent.click(btnCategory);
    expect(global.fetch).toHaveBeenCalledTimes(4);
    userEvent.click(btnBeef);
    userEvent.click(btnBeef);
  });
});
