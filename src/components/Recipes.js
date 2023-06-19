import React, { useContext, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Context from '../context/Context';

function Recipes() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [selCategory, setSelCategory] = useState('');
  const [filteredCategory, setFilteredCategory] = useState('');

  const { recipesList, setRecipesList,
    isDisableImg, setIsDisableImg } = useContext(Context);

  const mealsEndPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const drinksEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const catMealsEndPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const catDrinksEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const history = useHistory();
  const { pathname } = history.location;

  useEffect(() => {
    const fetchRecipes = async () => {
      const flavor = pathname === '/meals' ? mealsEndPoint : drinksEndPoint;
      const data = await fetch(flavor);
      const results = await data.json();
      const { meals, drinks } = results;
      const type = meals || drinks;
      const numCards = 12;
      setIsDisableImg(true);
      setRecipesList(type.slice(0, numCards));
    };
    fetchRecipes();
  }, [pathname, setIsDisableImg, setRecipesList]);

  useEffect(() => {
    const fetchCategories = async () => {
      const flavor = pathname === '/meals' ? catMealsEndPoint : catDrinksEndPoint;
      const data = await fetch(flavor);
      const results = await data.json();
      const { meals, drinks } = results;
      const type = meals || drinks;
      const numCards = 5;
      setIsDisableImg(true);
      setCategoriesList(type.slice(0, numCards));
    };
    fetchCategories();
  }, [pathname, setIsDisableImg]);

  useEffect(() => {
    if (selCategory) {
      const fetchFiltered = async () => {
        const endPoint = pathname === '/meals'
          ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selCategory}` : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selCategory}`;
        const data = await fetch(endPoint);
        const results = await data.json();
        const { meals, drinks } = results;
        const type = meals || drinks;
        const numCards = 12;
        setIsDisableImg(true);
        setFilteredCategory(type.slice(0, numCards));
      };
      fetchFiltered();
    } else {
      setFilteredCategory('');
    }
  }, [selCategory, pathname, setIsDisableImg]);

  const filterCategory = (event) => {
    if (selCategory === event.target.innerText) {
      setSelCategory('');
    } else {
      setSelCategory(event.target.innerText);
    }
  };

  const btnAll = () => {
    setSelCategory('');
    setFilteredCategory('');
  };

  return (
    <div>
      <div>
        {
          categoriesList.map((category) => (
            <button
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
              key={ `${category.strCategory}-category-filter` }
              onClick={ filterCategory }
            >
              {category.strCategory}
            </button>
          ))
        }
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ btnAll }
        >
          All
        </button>
      </div>
      {
        isDisableImg

      && (
        <div>
          {(filteredCategory || recipesList)
            .map((recipe, index) => {
              const objNames = pathname === '/meals' ? {
                id: 'idMeal',
                name: 'strMeal',
                image: 'strMealThumb',
              } : {
                id: 'idDrink',
                name: 'strDrink',
                image: 'strDrinkThumb',
              };
              return (
                <Link
                  key={ index }
                  to={ `${pathname}/${recipe[objNames.id]}` }
                >
                  <div
                    data-testid={ `${index}-recipe-card` }

                  >

                    <p data-testid={ `${index}-card-name` }>{recipe[objNames.name]}</p>
                    <img
                      data-testid={ `${index}-card-img` }
                      // className="card-img"
                      src={ recipe[objNames.image] }
                      alt={ `${recipe.strMeal} imagem` }
                    />
                  </div>
                </Link>
              );
            })}
        </div>
      )
      }
    </div>
  );
}

export default Recipes;
