import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../Style/RecipeDetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Ingredients from '../components/Ingredients';

const copy = require('clipboard-copy');

class DrinkDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drink: [],
      recipes: [],
      redirect: false,
      favoriteRecipes: [],
      heart: whiteHeartIcon,
      doneRecipes: [],
      testRecipeDone: false,
      linkCopiado: false,
    };
    this.getDrink = this.getDrink.bind(this);
    this.getRecipes = this.getRecipes.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getLocalStoreFavorites = this.getLocalStoreFavorites.bind(this);
    this.getLocalStoreDone = this.getLocalStoreDone.bind(this);
    this.handleClickFavorite = this.handleClickFavorite.bind(this);
    this.setIntialHeart = this.setIntialHeart.bind(this);
  }

  componentDidMount() {
    this.getDrink();
    this.getRecipes();
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
    const { heart, favoriteRecipes, drink } = this.state;
    const newFavorite = [...favoriteRecipes];
    const {
      strDrinkThumb,
      idDrink,
      strDrink,
      strAlcoholic,
      strCategory,
    } = drink;
    const modelo = {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
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
          const teste = favoriteRecipes.filter((model) => model.id !== drink.idDrink);
          this.setState({ favoriteRecipes: teste },
            () => {
              localStorage.setItem('favoriteRecipes', JSON.stringify(teste));
            });
        });
    }
  }

  async getDrink() {
    const { match: { params: { id } } } = this.props;
    const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { drinks } = await result.json();
    this.setState({ drink: drinks[0] }, () => {
      this.setIntialHeart();
    });
  }

  async getRecipes() {
    const LENGTH_SEIS = 6;
    const result = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const { meals } = await result.json();
    const listRecipes = meals.slice(0, LENGTH_SEIS);
    this.setState({ recipes: listRecipes });
  }

  getLocalStoreFavorites(favorite) {
    this.setState({ favoriteRecipes: favorite });
  }

  getLocalStoreDone(done) {
    this.setState({ doneRecipes: done });
  }

  setIntialHeart() {
    const { drink, favoriteRecipes, doneRecipes } = this.state;
    const testHeart = favoriteRecipes.some((fav) => fav.id === drink.idDrink);
    if (testHeart) {
      this.setState({ heart: blackHeartIcon });
    } else {
      this.setState({ heart: whiteHeartIcon });
    }
    const testDone = doneRecipes.some((fav) => fav.id === drink.idMeal);
    if (testDone) {
      this.setState({ testRecipeDone: true });
    } else {
      this.setState({ testRecipeDone: false });
    }
  }

  render() {
    const { drink, recipes, redirect, heart, linkCopiado, testRecipeDone } = this.state;
    const { match: { params: { id } } } = this.props;
    if (redirect) {
      return <Redirect to={ `/bebidas/${id}/in-progress` } />;
    }
    if (drink.length === 0) {
      return <h2>Loading...</h2>;
    }

    const {
      strDrinkThumb,
      idDrink,
      strDrink,
      strAlcoholic,
      strInstructions } = drink;
    return (
      <div>
        <img
          className="recipeImg"
          src={ strDrinkThumb }
          alt={ idDrink }
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-title">{strDrink}</h2>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ async () => {
            const { location: { pathname } } = this.props;
            await copy(`http://localhost:3000${pathname}`);
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
            data-testid="favorite-btn"
            alt="whiteHeartIcon"
          />
        </button>
        <h3 data-testid="recipe-category">{strAlcoholic}</h3>
        <Ingredients recipe={ drink } />
        <h3>Instructions</h3>
        <p data-testid="instructions">
          {strInstructions}
        </p>
        <h3>Receitas Recomendadas</h3>
        <div
          className="recomendation-List"
        >
          {recipes.map((recipe, index) => (
            <div
              className="card-drink"
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                className="img-recommed-drink"
                src={ recipe.strMealThumb }
                alt={ index }
              />
              <span data-testid={ `${index}-recomendation-title` }>{recipe.strMeal}</span>
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

DrinkDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
};

export default DrinkDetails;
