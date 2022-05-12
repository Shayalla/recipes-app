import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import '../Style/Progress.css';

const copy = require('clipboard-copy');

const number = 7;

class RecipeProcess extends Component {
  constructor(props) {
    super(props);
    console.log('aqui');

    this.state = {
      className: '',
      redirect: false,
      chec: false,
      active: true,
      recipe: [],
      count: 0,
      arrayFinal: [],
      isFavorite: false,
      share: false,
      heart: whiteHeartIcon,
      favoriteRecipes: [],
    };

    this.getRecipe = this.getRecipe.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleStorange = this.handleStorange.bind(this);
    this.setIntialHeart = this.setIntialHeart.bind(this);
  }

  componentDidMount() {
    this.getRecipe();
    this.handleStorange();
  }

  handleStorange() {
    const checSave = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(favorite);
    if (favorite) {
      this.setState({ chec: checSave, favoriteRecipes: favorite });
    }
  }

  handleChange(e) {
    console.log(e.target.checked);
    const { count } = this.state;
    if (e.target.checked) {
      console.log('if');
      this.setState((state) => ({ count: state.count + 1 }), () => {
        console.log(count);
      });
    } else {
      this.setState((state) => ({ count: state.count - 1 }));
    }
    if (count === number) {
      this.setState({ active: false });
    }
    this.setState((state) => ({ ...state,
      className: 'Risk' }), () => {
      localStorage.setItem('inProgressRecipes', JSON.stringify(''));
    });
  }

  handleClick() {
    this.setState({ redirect: true });
  }

  handleFavorite() {
    const { heart, favoriteRecipes, recipe } = this.state;
    console.log(favoriteRecipes);
    const newFavorite = [...favoriteRecipes];
    const {
      strMealThumb,
      idMeal,
      strArea,
      strMeal,
      strCategory,
    } = recipe[0];
    console.log(recipe);
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

  async handleShare() {
    const { match: { params: { id: idSend } } } = this.props;
    await copy(`http://localhost:3000/comidas/${idSend}`);
    this.setState({ share: true });
  }

  setIntialHeart() {
    const { recipe, favoriteRecipes } = this.state;
    console.log(recipe);
    const testHeart = favoriteRecipes.some((fav) => fav.id === recipe[0].idMeal);
    if (testHeart) {
      this.setState({ heart: blackHeartIcon });
    } else {
      this.setState({ heart: whiteHeartIcon });
    }
  }

  async getRecipe() {
    const { match: { params: { id } } } = this.props;
    const result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { meals } = await result.json();
    this.setState({ recipe: meals }, () => {
      this.setIntialHeart();
      const { recipe } = this.state;
      const ingredientsKeys = Object.entries(recipe);
      const arrayFinal = [];
      ingredientsKeys.forEach((cur) => {
        arrayFinal.push(cur[1].strIngredient1,
          cur[1].strIngredient2,
          cur[1].strIngredient3,
          cur[1].strIngredient4,
          cur[1].strIngredient5,
          cur[1].strIngredient6,
          cur[1].strIngredient7,
          cur[1].strIngredient8);
      });
      this.setState({ arrayFinal });
    });
  }

  render() {
    const { redirect,
      recipe, className, active, arrayFinal, isFavorite, share, heart } = this.state;
    console.log(`favorito ${isFavorite}`);
    if (redirect) return <Redirect to="/receitas-feitas" />;
    return (
      <div>
        <h2>Recipe Process</h2>
        {recipe && recipe.map((receita) => (
          <div key={ receita.idMeal }>
            <img
              width="50px"
              data-testid="recipe-photo"
              src={ receita.strMealThumb }
              alt="img"
            />
            <h1 data-testid="recipe-title">{receita.idMeal}</h1>
            <p data-testid="recipe-category">{receita.strCategory}</p>
            <p data-testid="instructions">{receita.strInstructions}</p>
          </div>
        ))}
        {arrayFinal && arrayFinal.map((ing, index) => {
          if (ing === '' || ing === null || ing === undefined) return false;
          return (
            <p
              className={ className }
              key={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              {ing}
              <input onChange={ this.handleChange } type="checkbox" />
            </p>
          );
        })}
        {share && <p>Link copiado!</p>}
        <button
          onClick={ this.handleShare }
          type="button"
          data-testid="share-btn"
        >
          Compartilhar
        </button>
        <button
          type="button"
          onClick={ this.handleFavorite }
        >
          <img
            data-testid="favorite-btn"
            className="icons"
            src={ heart }
            alt="whiteHeartIcon"
          />
        </button>
        <button
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ this.handleClick }
          disabled={ active }
        >
          Finalizar Receita
        </button>
      </div>
    );
  }
}

RecipeProcess.propTypes = {
  match: Proptypes.shape().isRequired,
  id: Proptypes.number.isRequired,
};

export default RecipeProcess;
