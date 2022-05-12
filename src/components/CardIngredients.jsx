import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardIngredients extends Component {
  render() {
    const { ingredient, index, type } = this.props;
    return (
      <div data-testid={ `${index}-ingredient-card` }>
        <img
          src={ type === 'comida'
            ? `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`
            : `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` }
          alt={ ingredient }
          data-testid={ `${index}-card-img` }
          width="30px"
        />
        <p data-testid={ `${index}-card-name` }>{ingredient}</p>
      </div>
    );
  }
}

CardIngredients.propTypes = {
  ingredient: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default CardIngredients;
