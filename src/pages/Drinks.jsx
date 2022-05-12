import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';
import { actionCategoriesDrinks, actionDrinks,
  actionDrinksByCategories } from '../actions';
import CardItem from '../components/CardItem';
// import '../Style/Recipes.css';

class Drinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: false,
      categories: '',
    };

    this.mapearLista = this.mapearLista.bind(this);
    this.fetchDrinksCategory = this.fetchDrinksCategory.bind(this);
    this.fetchs = this.fetchs.bind(this);
  }

  componentDidMount() {
    this.fetchs();
  }

  fetchs() {
    const { categories, listDrinks, drinks } = this.props;
    categories();
    if (listDrinks.length === 0) drinks();
  }

  async fetchDrinksCategory(category) {
    const { filter, categories } = this.state;
    const { drinksByCategory, drinks } = this.props;
    this.setState({ categories: category });
    if (!filter || categories !== category) {
      drinksByCategory(category);
      this.setState({ filter: true });
    } else {
      drinks();
      this.setState({ filter: false });
    }
  }

  mapearLista({ strDrinkThumb, strDrink, idDrink }, index) {
    return (
      <Link to={ `/bebidas/${idDrink}` } key={ index }>
        <CardItem
          className="list"
          index={ index }
          name={ strDrink }
          image={ strDrinkThumb }
        />
      </Link>);
  }

  render() {
    const { filter } = this.state;
    const { listDrinks, listCategories, listByCategory } = this.props;
    if (!listDrinks) return (<h3>Loading...</h3>);
    if (listDrinks.length === 1) {
      return <Redirect to={ `/bebidas/${listDrinks[0].idDrink}` } />;
    }
    return (
      <>
        <Header header="Bebidas" explorer />
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
        {listCategories
          ? listCategories.map(({ strCategory }, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `${strCategory}-category-filter` }
              name={ strCategory }
              onClick={ () => this.fetchDrinksCategory(strCategory) }
            >
              {strCategory}
            </button>
          ))
          : <h3>Loading...</h3> }
        {filter
          ? listByCategory.map((element, index) => this.mapearLista(element, index))
          : listDrinks.map((element, index) => this.mapearLista(element, index))}
        <DownMenu />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  drinks: () => dispatch(actionDrinks()),
  categories: () => dispatch(actionCategoriesDrinks()),
  drinksByCategory: (category) => dispatch(actionDrinksByCategories(category)),
});
const mapStateToProps = (state) => ({
  listDrinks: state.drinks.drinks,
  listCategories: state.categories.categories,
  listByCategory: state.drinks.byCategories,
});

Drinks.propTypes = {
  drinks: PropTypes.func.isRequired,
  listDrinks: PropTypes.shape().isRequired,
  categories: PropTypes.func.isRequired,
  listCategories: PropTypes.arrayOf().isRequired,
  drinksByCategory: PropTypes.func.isRequired,
  listByCategory: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
