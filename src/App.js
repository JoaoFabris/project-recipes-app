import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import 'bootstrap/dist/css/bootstrap.min.css';
// Pages
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import DetailsMeals from './pages/DetailsMeals';
import DetailsDrinks from './pages/DetailsDrinks';
import InProgressMeals from './pages/InProgressMeals';
import InProgressDrinks from './pages/InProgressDrinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import Favorite from './pages/Favorite';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/meals" component={ Meals } />
          <Route path="/drinks" component={ Drinks } />
          <Route exact path="/meals/:id-da-receita" component={ DetailsMeals } />
          <Route exact path="/drinks/:id-da-receita" component={ DetailsDrinks } />
          <Route
            exact
            path="/meals/:id-da-receita/in-progress"
            component={ InProgressMeals }
          />
          <Route
            exact
            path="/drinks/:id-da-receita/in-progress"
            component={ InProgressDrinks }
          />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ Favorite } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
