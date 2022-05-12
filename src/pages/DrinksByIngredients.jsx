import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';
import { actionIngredientsDrinks, actionDrinksByIngredients } from '../actions';
import CardIngredients from '../components/CardIngredients';

class DrinksByIngredients extends Component {
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
    const { drinksByIng } = this.props;
    await drinksByIng(ingredient);
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
    if (redirect) return <Redirect to="/bebidas" />;
    console.log(listIngredients);
    return (
      <div>
        <Header header="Explorar Ingredientes" />
        <h2> Drinks By Ingredients</h2>
        {listIngredients.map(({ strIngredient1 }, index) => (
          <button
            key={ index }
            type="button"
            onClick={ () => this.handleClick(strIngredient1) }
          >
            <CardIngredients
              type="bebida"
              ingredient={ strIngredient1 }
              index={ index }
            />
          </button>
        ))}
        <DownMenu />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  ingredients: () => dispatch(actionIngredientsDrinks()),
  drinksByIng: (ingredientes) => dispatch(actionDrinksByIngredients(ingredientes)),
});

const mapStateToProps = (state) => ({
  listIngredients: state.drinks.ingredients,
});

DrinksByIngredients.propTypes = {
  ingredients: PropTypes.func.isRequired,
  drinksByIng: PropTypes.func.isRequired,
  listIngredients: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DrinksByIngredients);
