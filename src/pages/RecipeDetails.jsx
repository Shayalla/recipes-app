import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../Style/RecipeDetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Ingredients from '../components/Ingredients';

const copy = require('clipboard-copy');

class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: [],
      drinks: [],
      redirect: false,
      favoriteRecipes: [],
      heart: whiteHeartIcon,
      doneRecipes: [],
      testRecipeDone: true,
      linkCopiado: false,
    };
    this.getRecipe = this.getRecipe.bind(this);
    this.getDrinks = this.getDrinks.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getLocalStoreFavorites = this.getLocalStoreFavorites.bind(this);
    this.getLocalStoreDone = this.getLocalStoreDone.bind(this);
    this.handleClickFavorite = this.handleClickFavorite.bind(this);
    this.setIntialHeart = this.setIntialHeart.bind(this);
  }

  componentDidMount() {
    this.getRecipe();
    this.getDrinks();
    const favorite = localStorage.getItem('favoriteRecipes');
    const done = localStorage.getItem('doneRecipes');
    if (favorite) {
      this.getLocalStoreFavorites(JSON.parse(favorite));
    }
    if (done) {
      this.getLocalStoreDone(JSON.parse(done));
    }
  }

  handleClick() {
    this.setState({ redirect: true });
  }

  handleClickFavorite() {
    const { heart, favoriteRecipes, recipe } = this.state;
    const newFavorite = [...favoriteRecipes];
    const {
      strMealThumb,
      idMeal,
      strArea,
      strMeal,
      strCategory,
    } = recipe;
    const modelo = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    if (heart === whiteHeartIcon) {
      this.setState({ heart: blackHeartIcon },
        () => {
          newFavorite.push(modelo);
          this.setState({ favoriteRecipes: newFavorite },
            () => {
              localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
            });
        });
    } else {
      this.setState({ heart: whiteHeartIcon },
        () => {
          const teste = favoriteRecipes.filter((model) => model.id !== recipe.idMeal);
          this.setState({ favoriteRecipes: teste },
            () => {
              localStorage.setItem('favoriteRecipes', JSON.stringify(teste));
            });
        });
    }
  }

  async getRecipe() {
    const { match: { params: { id } } } = this.props;
    const result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { meals } = await result.json();
    this.setState({ recipe: meals[0] }, () => {
      this.setIntialHeart();
    });
  }

  async getDrinks() {
    const LENGTH_SEIS = 6;
    const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const { drinks } = await result.json();
    const listDrinks = drinks.slice(0, LENGTH_SEIS);
    this.setState({ drinks: listDrinks });
  }

  getLocalStoreFavorites(favorite) {
    this.setState({ favoriteRecipes: favorite });
  }

  getLocalStoreDone(done) {
    this.setState({ doneRecipes: done });
  }

  setIntialHeart() {
    const { recipe, favoriteRecipes, doneRecipes } = this.state;
    const testHeart = favoriteRecipes.some((fav) => fav.id === recipe.idMeal);
    if (testHeart) {
      this.setState({ heart: blackHeartIcon });
    } else {
      this.setState({ heart: whiteHeartIcon });
    }
    console.log(recipe);
    console.log(doneRecipes);
    const testDone = doneRecipes.some((fav) => fav.id === recipe.idMeal);
    console.log(testDone);
    if (testDone) {
      console.log('true');
      this.setState({ testRecipeDone: true });
    } else {
      console.log('false');
      this.setState({ testRecipeDone: false });
    }
  }

  render() {
    const { recipe, drinks, redirect, heart, testRecipeDone, linkCopiado } = this.state;
    const { match: { params: { id } } } = this.props;
    if (redirect) {
      return <Redirect to={ `/comidas/${id}/in-progress` } />;
    }
    if (recipe.length === 0) {
      return <h2>Loading...</h2>;
    }

    const {
      strMealThumb,
      idMeal,
      strMeal,
      strCategory,
      strYoutube,
      strInstructions } = recipe;
    return (
      <div className="page-details">
        <img
          className="recipeImg"
          src={ strMealThumb }
          alt={ idMeal }
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-title">{strMeal}</h2>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ async () => {
            const { match: { params: { id: idSend } } } = this.props;

            await copy(`http://localhost:3000/comidas/${idSend}`);
            this.setState({ linkCopiado: true });
          } }
        >
          <img className="icons" src={ shareIcon } alt="shareButton" />
        </button>
        { linkCopiado && <span>Link copiado!</span>}
        <button
          type="button"
          onClick={ this.handleClickFavorite }
        >
          <img
            className="icons"
            src={ heart }
            alt="whiteHeartIcon"
            data-testid="favorite-btn"
          />
        </button>
        <h3 data-testid="recipe-category">{strCategory}</h3>
        <Ingredients recipe={ recipe } />
        <h3>Instructions</h3>
        <p data-testid="instructions">
          {strInstructions}
        </p>
        <iframe
          data-testid="video"
          src={ strYoutube }
          title="This is a unique title"
        />

        <h3>Receitas Recomendadas</h3>
        <div
          className="recomendation-List"
        >
          {drinks.map((drink, index) => (
            <div
              className="card-drink"
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                className="img-recommed-drink"
                src={ drink.strDrinkThumb }
                alt={ index }
              />
              <span data-testid={ `${index}-recomendation-title` }>{drink.strDrink}</span>
            </div>
          ))}
        </div>
        <button
          className="button"
          onClick={ this.handleClick }
          type="button"
          data-testid="start-recipe-btn"
          disabled={ testRecipeDone }
        >
          iniciar receita
        </button>
      </div>
    );
  }
}

RecipeDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  id: PropTypes.number.isRequired,
};

export default RecipeDetails;
