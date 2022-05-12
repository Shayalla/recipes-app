import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ingredients extends Component {
  render() {
    const { recipe } = this.props;
    const ingredientsKeys = Object.entries(recipe);
    const ingredients = [];
    const measures = [];

    ingredientsKeys.forEach((key) => {
      if (key[0].includes('strIngredient') && key[1] !== null && key[1] !== '') {
        ingredients.push(key[1]);
      }
    });
    ingredientsKeys.forEach((key) => {
      if (key[0].match('strMeasure') && key[1] !== null && key[1] !== '') {
        measures.push(key[1]);
      }
    });
    const finalList = [];
    for (let i = 0; i <= (ingredients.length - 1); i += 1) {
      if (measures[i] === undefined) {
        finalList.push(ingredients[i]);
      } else {
        finalList.push(`${measures[i]} - ${ingredients[i]}`);
      }
    }
    return (
      <div>
        <h2>Ingredients</h2>
        <ul>
          {finalList.map((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {ingredient}
            </li>))}
        </ul>
      </div>
    );
  }
}
Ingredients.propTypes = {
  recipe: PropTypes.objectOf().isRequired,

};
export default Ingredients;
