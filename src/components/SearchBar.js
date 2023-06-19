import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import fetchAPI from '../services/FetchAPI';

export default function SearchBar() {
  const [radioValue, setRadioValue] = useState('');
  const [responseSerch, setResponseSearch] = useState([]);

  const twelve = 12;
  const error = 'Your search must have only 1 (one) character';
  const showErro = 'Sorry, we haven\'t found any recipes for these filters.';

  const {
    inputSearch, setResultFilterDrinks,
    setResultFilterMeals, setIsDisableImg } = useContext(Context);

  useEffect(() => {
    const resultFilterResponseSearch = () => {
      const resultMeals = responseSerch.meals?.slice(0, twelve);
      const resultDrinks = responseSerch.drinks?.slice(0, twelve);
      setResultFilterMeals(resultMeals);
      setResultFilterDrinks(resultDrinks);
    };
    resultFilterResponseSearch();
  }, [responseSerch.drinks, responseSerch.meals,
    setResultFilterDrinks, setResultFilterMeals]);

  const history = useHistory();
  const { location: { pathname } } = history;

  const handleChange = ({ target }) => {
    setRadioValue(target.value);
  };

  const ApiSearchBarMeals = async () => {
    if (radioValue === 'ingredient') {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
      const response = await fetchAPI(url);
      if (response.meals === null) {
        global.alert(showErro);
      }
      return setResponseSearch(response);
    }

    if (radioValue === 'name') {
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`;
      const response = await fetchAPI(url);
      if (response.meals === null) {
        global.alert(showErro);
      }
      return setResponseSearch(response);
    }

    if (radioValue === 'first-letter' && inputSearch.length === 1) {
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`;
      const response = await fetchAPI(url);
      return setResponseSearch(response);
    }

    global.alert(error);
  };

  const ApiSearchBarDrinks = async () => {
    if (radioValue === 'ingredient') {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
      const response = await fetchAPI(url);
      if (response.drinks === null) {
        global.alert(showErro);
      }
      return setResponseSearch(response);
    }

    if (radioValue === 'name') {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`;
      const response = await fetchAPI(url);
      if (response.drinks === null) {
        global.alert(showErro);
      }
      return setResponseSearch(response);
    }

    if (radioValue === 'first-letter' && inputSearch.length === 1) {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputSearch}`;
      const response = await fetchAPI(url);
      return setResponseSearch(response);
    }
    global.alert(error);
  };

  const vericaSeTelaDeDrinksOuMeals = () => {
    if (pathname === '/meals') {
      return ApiSearchBarMeals();
    }

    if (pathname === '/drinks') {
      return ApiSearchBarDrinks();
    }
  };
  useEffect(() => {
    const redirect = () => {
      if (responseSerch.meals?.length === 1) {
        history.push(`/meals/${responseSerch.meals[0].idMeal}`);
      }
      if (responseSerch.drinks?.length === 1) {
        history.push(`/drinks/${responseSerch.drinks[0].idDrink}`);
      }
    };
    redirect();
  });

  const handleClick = () => {
    setIsDisableImg(false);
    vericaSeTelaDeDrinksOuMeals();
  };

  return (
    <div>
      <p>
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="search"
          value="ingredient"
          onChange={ handleChange }
        />
        Ingredient
        <input
          data-testid="name-search-radio"
          type="radio"
          name="search"
          value="name"
          onChange={ handleChange }
        />
        Name
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="search"
          value="first-letter"
          onChange={ handleChange }
        />
        Fist letter
      </p>
      <p>
        <input
          data-testid="exec-search-btn"
          type="button"
          id="btnSearch"
          value="SEARCH"
          onClick={ handleClick }
        />
      </p>
    </div>
  );
}
