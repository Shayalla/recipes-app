import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';
import { actionRecipes, actionCategoriesRecipes,
  actionRecipesByCategories } from '../actions';
import CardItem from '../components/CardItem';
import '../Style/Recipes.css';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: false,
      categories: '',
    };

    this.mapearLista = this.mapearLista.bind(this);
    this.fetchRecipesCategory = this.fetchRecipesCategory.bind(this);
    this.fetchs = this.fetchs.bind(this);
  }

  componentDidMount() {
    this.fetchs();
  }

  async fetchs() {
    const { categories, listRecipes, recipes } = this.props;
    categories();
    if (listRecipes.length === 0) return recipes();
  }

  async fetchRecipesCategory(category) {
    const { filter, categories } = this.state;
    const { recipesByCategory, recipes } = this.props;
    this.setState({ categories: category });
    if (!filter || categories !== category) {
      recipesByCategory(category);
      this.setState({ filter: true });
    } else {
      recipes();
      this.setState({ filter: false });
    }
  }

  mapearLista({ strMealThumb, strMeal, idMeal }, index) {
    return (
      <Link to={ `/comidas/${idMeal}` } key={ idMeal }>
        <CardItem
          className="list"
          index={ index }
          name={ strMeal }
          image={ strMealThumb }
        />
      </Link>);
  }

  render() {
    const { filter } = this.state;
    const { listRecipes, listCategories, listByCategory } = this.props;
    if (!listRecipes) return (<h3>Loading...</h3>); // OBS possível bug
    if (listRecipes.length === 1) {
      return <Redirect to={ `/comidas/${listRecipes[0].idMeal}` } />;
    }
    // mudança5
    return (
      <>
        <Header header="Comidas" explorer />
        <h1>Recipes</h1>
        <h1>Recipes</h1>
        <h1>Recipes</h1>
        <h1>Recipes</h1>
        <h1>Recipes</h1>
        <h1>Recipes</h1>
        <h1>Recipes</h1>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => this.setState({ filter: false }) }
        >
          All
        </button>
        {listCategories.map(({ strCategory }, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${strCategory}-category-filter` }
            name={ strCategory }
            onClick={ () => this.fetchRecipesCategory(strCategory) }
          >
            {strCategory}
          </button>
        ))}
        {filter
          ? listByCategory.map((element, index) => this.mapearLista(element, index))
          : listRecipes.map((element, index) => this.mapearLista(element, index))}
        {console.log(listRecipes)}
        <DownMenu />
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  recipes: () => dispatch(actionRecipes()),
  categories: () => dispatch(actionCategoriesRecipes()),
  recipesByCategory: (category) => dispatch(actionRecipesByCategories(category)),
});

const mapStateToProps = (state) => ({
  listRecipes: state.recipes.recipes,
  listCategories: state.categories.categories,
  listByCategory: state.recipes.byCategories,
});

Recipes.propTypes = {
  recipes: PropTypes.func.isRequired,
  listRecipes: PropTypes.arrayOf().isRequired,
  categories: PropTypes.func.isRequired,
  listCategories: PropTypes.arrayOf().isRequired,
  recipesByCategory: PropTypes.func.isRequired,
  listByCategory: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
