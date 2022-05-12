import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import '../Style/Progress.css';

const copy = require('clipboard-copy');

const number = 2;

class DrinkProcess extends Component {
  constructor(props) {
    super(props);
    console.log('aqui');

    this.state = {
      className: '',
      active: true,
      redirect: false,
      drinks: [],
      ingredients: [],
      count: 0,
      share: false,
      heart: whiteHeartIcon,
      favoriteRecipes: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleStorange = this.handleStorange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getDrink = this.getDrink.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.setIntialHeart = this.setIntialHeart.bind(this);
  }

  componentDidMount() {
    this.getDrink();
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
    const { heart, favoriteRecipes, drinks } = this.state;
    console.log(drinks);
    const newFavorite = [...favoriteRecipes];
    const {
      idDrink,
      strDrink,
      strCategory,
      strAlcoholic,
      strDrinkThumb,
    } = drinks[0];
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
      console.log('else');
      this.setState({ heart: whiteHeartIcon },
        () => {
          const teste = favoriteRecipes.filter((model) => model.id !== drinks[0].idDrink);
          console.log(teste);
          console.log(drinks);
          this.setState({ favoriteRecipes: teste },
            () => {
              localStorage.setItem('favoriteRecipes', JSON.stringify(teste));
            });
        });
    }
  }

  setIntialHeart() {
    const { drinks, favoriteRecipes } = this.state;
    const testHeart = favoriteRecipes.some((fav) => fav.id === drinks[0].idDrink);
    if (testHeart) {
      this.setState({ heart: blackHeartIcon });
    } else {
      this.setState({ heart: whiteHeartIcon });
    }
  }

  async getDrink() {
    // console.log('aqui getRecipe');
    const { match: { params: { id } } } = this.props;
    // console.log(id);
    const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { drinks } = await result.json();
    // console.log(drinks);
    drinks.forEach((cur) => {
      // console.log(cur);
      const aux = Object.entries(cur);
      // console.log(aux);
      this.setState({ drinks, ingredients: aux }, () => {
        this.setIntialHeart();
      });
    });
  }

  render() {
    const { drinks, ingredients, className, active, redirect, link, share,
      heart } = this.state;
    // console.log(ingredients);
    if (redirect) return <Redirect to="/receitas-feitas" />;
    return (
      <div>
        <h2>Drinks Process</h2>
        {drinks.map((teste) => (
          <div key={ teste.idDrink }>
            <img
              width="50px"
              data-testid="recipe-photo"
              src={ teste.strDrinkThumb }
              alt="img"
            />
            <h1 data-testid="recipe-title">{teste.strGlass}</h1>
            <p data-testid="recipe-category">{teste.strCategory}</p>
            <p data-testid="instructions">{teste.strInstructions}</p>
          </div>
        ))}
        <div>
          <span>Ingredientes:</span>
          {ingredients.filter(([chave]) => chave === 'strIngredient1'
          || chave === 'strIngredient2' || chave === 'strIngredient3')
            .map(([chave, valor], index) => (
              <p
                className={ className }
                key={ chave }
                data-testid={ `${index}-ingredient-step` }
              >
                -
                {valor}
                <input
                  // name={ index }
                  onChange={ this.handleChange }
                  type="checkbox"
                />
              </p>
            ))}
          <button
            data-testid="share-btn"
            type="button"
            onClick={ async () => {
              const { match: { params: { id: idSend } } } = this.props;
              await copy(`http://localhost:3000/bebidas/${idSend}`);
              this.setState({ share: true });
            } }
          >
            Compartilhar
          </button>
          {share && <p>Link copiado!</p> }
          <p>{link}</p>
          <button
            type="button"
            onClick={ this.handleFavorite }
          >
            <img
              className="icons"
              src={ heart }
              alt="whiteHeartIcon"
              data-testid="favorite-btn"
            />
          </button>
          <button
            onClick={ this.handleClick }
            disabled={ active }
            data-testid="finish-recipe-btn"
            type="button"
          >
            Finalizar Receita
          </button>
        </div>
      </div>
    );
  }
}

DrinkProcess.propTypes = {
  match: Proptypes.shape().isRequired,
  id: Proptypes.number.isRequired,
};

export default DrinkProcess;

// teste
