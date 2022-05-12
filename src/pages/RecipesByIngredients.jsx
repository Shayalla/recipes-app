import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';
import { actionIngredientsRecipes, actionRecipesByIngredients } from '../actions';
import CardIngredients from '../components/CardIngredients';

class RecipesByIngredients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    };

    this.fetch = this.fetch.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  async handleClick(ingredient) {
    const { recipesByIng } = this.props;
    await recipesByIng(ingredient);
    this.setState({ redirect: true });
  }

  fetch() {
    const { ingredients } = this.props;
    ingredients();
  }

  render() {
    const { redirect } = this.state;
    const { listIngredients } = this.props;
    if (!listIngredients) return <p>Loading...</p>;
    if (redirect) return <Redirect to="/comidas" />;
    console.log(listIngredients);
    return (
      <div>
        <Header header="Explorar Ingredientes" />
        <h2> Recipes By Ingredients</h2>
        {listIngredients.map(({ strIngredient }, index) => (
          <button
            key={ index }
            type="button"
            onClick={ () => this.handleClick(strIngredient) }
          >
            <CardIngredients type="comida" ingredient={ strIngredient } index={ index } />
          </button>
        ))}
        <DownMenu />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  ingredients: () => dispatch(actionIngredientsRecipes()),
  recipesByIng: (ingredientes) => dispatch(actionRecipesByIngredients(ingredientes)),
});

const mapStateToProps = (state) => ({
  listIngredients: state.recipes.ingredients,
});

RecipesByIngredients.propTypes = {
  ingredients: PropTypes.func.isRequired,
  recipesByIng: PropTypes.func.isRequired,
  listIngredients: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesByIngredients);
