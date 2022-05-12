import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../Style/FavoriteRecipes.css';
import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

class FavoriteRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteRecipes: [],
      localFavoriteRecipes: [],
      linkCopiado: false,
    };
    this.getFavoriteRecipes = this.getFavoriteRecipes.bind(this);
    this.desfavorite = this.desfavorite.bind(this);
    this.filterAll = this.filterAll.bind(this);
    this.filterDrinks = this.filterDrinks.bind(this);
    this.filterFoods = this.filterFoods.bind(this);
  }

  componentDidMount() {
    this.getFavoriteRecipes();
  }

  getFavoriteRecipes() {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    this.setState({ favoriteRecipes: favorite, localFavoriteRecipes: favorite });
  }

  desfavorite(recipe) {
    const { favoriteRecipes } = this.state;
    const teste = favoriteRecipes.filter((model) => model.id !== recipe.id);
    this.setState({ favoriteRecipes: teste },
      () => {
        localStorage.setItem('favoriteRecipes', JSON.stringify(teste));
      });
  }

  filterAll() {
    console.log('filterAll');
    const { localFavoriteRecipes } = this.state;
    this.setState({ favoriteRecipes: localFavoriteRecipes });
  }

  filterDrinks() {
    console.log('filterDrinks');
    const { localFavoriteRecipes } = this.state;
    const teste = localFavoriteRecipes.filter((recipe) => recipe.type === 'bebida');
    console.log(teste);
    this.setState({ favoriteRecipes: teste });
  }

  filterFoods() {
    console.log('filterFoods');
    const { localFavoriteRecipes } = this.state;
    const teste = localFavoriteRecipes.filter((recipe) => recipe.type === 'comida');
    console.log(teste);
    this.setState({ favoriteRecipes: teste });
  }

  render() {
    const { favoriteRecipes, linkCopiado } = this.state;
    return (
      <div className="page-favorite-recipes">
        <Header header="Receitas Favoritas" />
        <div className="container-favorite-recipes">
          <div>
            <button
              type="button"
              data-testid="filter-by-all-btn"
              onClick={ this.filterAll }
            >
              All
            </button>
            <button
              type="button"
              data-testid="filter-by-food-btn"
              onClick={ this.filterFoods }
            >
              Food
            </button>
            <button
              type="button"
              data-testid="filter-by-drink-btn"
              onClick={ this.filterDrinks }
            >
              Drinks
            </button>
          </div>
          <div className="box-favorite-recipes">
            {favoriteRecipes && favoriteRecipes.map((recipe, index) => {
              if (recipe.type === 'comida') {
                return (
                  <div key={ recipe.id } className="favorite-recipe">
                    <Link to={ `/comidas/${recipe.id}` }>
                      <img
                        src={ recipe.image }
                        alt={ recipe.id }
                        data-testid={ `${index}-horizontal-image` }

                      />
                    </Link>
                    <div>
                      <p
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        {`${recipe.area} - ${recipe.category}`}
                      </p>
                      <Link to={ `/comidas/${recipe.id}` }>
                        <p
                          data-testid={ `${index}-horizontal-name` }
                        >
                          {`${recipe.name}`}
                        </p>
                      </Link>
                      { linkCopiado && <span>Link copiado!</span>}
                      <button
                        type="button"
                        onClick={ async () => {
                          await copy(`http://localhost:3000/comidas/${recipe.id}`);
                          this.setState({ linkCopiado: true });
                        } }
                      >
                        <img
                          src={ shareIcon }
                          alt="shareIcon"
                          data-testid={ `${index}-horizontal-share-btn` }
                          className="btn-icon"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={ () => {
                          this.desfavorite(recipe);
                        } }
                      >
                        <img
                          src={ blackHeartIcon }
                          data-testid={ `${index}-horizontal-favorite-btn` }
                          alt="favoriteIcon"
                        />
                      </button>

                    </div>
                  </div>);
              }
              if (recipe.type === 'bebida') {
                return (
                  <div key={ recipe.id } className="favorite-recipe">
                    <Link to={ `/bebidas/${recipe.id}` }>
                      <img
                        src={ recipe.image }
                        alt={ recipe.id }
                        data-testid={ `${index}-horizontal-image` }
                      />
                    </Link>
                    <div>
                      <p
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        {recipe.category}
                      </p>

                      <p
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        {`${recipe.alcoholicOrNot}`}
                      </p>
                      <Link to={ `/bebidas/${recipe.id}` }>
                        <p
                          data-testid={ `${index}-horizontal-name` }
                        >
                          {`${recipe.name}`}
                        </p>
                      </Link>
                      { linkCopiado && <span>Link copiado!</span>}
                      <button
                        type="button"
                        onClick={ async () => {
                          await copy(`http://localhost:3000/comidas/${recipe.id}`);
                          this.setState({ linkCopiado: true });
                        } }
                      >
                        <img
                          src={ shareIcon }
                          alt="shareIcon"
                          data-testid={ `${index}-horizontal-share-btn` }
                          className="btn-icon"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={ () => {
                          this.desfavorite(recipe);
                        } }
                      >
                        <img
                          src={ blackHeartIcon }
                          data-testid={ `${index}-horizontal-favorite-btn` }
                          alt="favoriteIcon"
                        />
                      </button>

                    </div>
                  </div>);
              }
              return false;
            })}
          </div>
        </div>
      </div>
    );
  }
}

// FavoriteRecipes.propTypes = {
//   // match: PropTypes.shape().isRequired,
//   // id: PropTypes.number.isRequired,
// };
export default FavoriteRecipes;
