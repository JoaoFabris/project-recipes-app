import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function RecipeInProgress() {
  const [favorite, setFavorite] = useState(false);
  const [details, setDetails] = useState({});
  const history = useHistory();
  const { pathname } = history.location;
  const id = pathname.replace(/[^0-9]/g, '');
  console.log(pathname);

  const checkIfIsFavorite = () => (favorite ? blackHeartIcon : whiteHeartIcon);

  const handleToggleFavorite = () => {
    setFavorite((previous) => !previous);
  };

  useEffect(() => {
    if (!localStorage.inProgressRecipes) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({ meals: { id: [] }, drinks: { id: [] } }),
      );
    }
  }, []);

  useEffect(() => {
    const fetchIdRecipe = async () => {
      const endPoint = pathname === `/meals/${id}/in-progress`
        ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        : (`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await fetch(endPoint);
      const result = await data.json();
      setDetails(result);
    };
    fetchIdRecipe();
  }, [id, pathname, setDetails]);

  return (
    <div>
      {(details.drinks || details.meals)
          && (details.meals || details.drinks).map((e) => {
            const objNames = pathname === `/meals/${id}/in-progress` ? {
              id: 'idMeal',
              name: 'strMeal',
              image: 'strMealThumb',
              category: 'strCategory',
              instructions: 'strInstructions',
              youtube: 'strYoutube',
            } : {
              id: 'idDrink',
              name: 'strDrink',
              image: 'strDrinkThumb',
              category: 'strAlcoholic',
              instructions: 'strInstructions',
            };
            return (
              <div key={ `${e[objNames.id]}` }>
                <img
                  data-testid="recipe-photo"
                  src={ e[objNames.image] }
                  alt={ e[objNames.name] }
                />
                <p data-testid="recipe-title">{e[objNames.name]}</p>
                <h3>Ingredients</h3>
                {
                  Object.keys(e).filter((el) => (
                    el.includes('strIngredient') && e[el] !== '' && e[el] !== null))
                    .map((elem, ind) => (
                      <div key={ ind }>
                        <label
                          data-testid={ `${ind}-ingredient-step` }
                          htmlFor={ elem }
                          className="check-list"
                        >
                          <input
                            className="check-ingredient"
                            type="checkbox"
                            name={ elem }
                            id={ elem }
                          />
                          <p>
                            {e[elem]}
                          </p>
                        </label>
                      </div>
                    ))
                }

                <button
                  className="btn-favorite"
                  type="button"
                >
                  <img
                    data-testid="share-btn"
                    src={ shareIcon }
                    alt="share"
                  />
                </button>
                <button
                  className="btn-favorite"
                  type="button"
                  onClick={ handleToggleFavorite }
                >
                  <img
                    data-testid="favorite-btn"
                    src={ checkIfIsFavorite() }
                    alt="favorite"
                  />
                </button>
                <p data-testid="recipe-category">{`Category: ${e[objNames.category]}`}</p>
                <p data-testid="instructions">{e[objNames.instructions]}</p>
                <button
                  type="button"
                  data-testid="finish-recipe-btn"
                >
                  Finalizar Receita
                </button>
              </div>
            );
          })}
    </div>
  );
}
