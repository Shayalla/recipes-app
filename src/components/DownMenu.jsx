import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionDrinks, actionRecipes } from '../actions';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../Style/DownMenu.css';

class DownMenu extends Component {
  constructor(props) {
    super(props);

    this.fecthRecipe = this.fecthRecipe.bind(this);
    this.fecthDrink = this.fecthDrink.bind(this);
  }

  fecthDrink() {
    const { drinks } = this.props;
    drinks();
  }

  fecthRecipe() {
    const { recipes } = this.props;
    recipes();
  }

  render() {
    return (
      <footer data-testid="footer">
        <Link to="/bebidas" onClick={ this.fecthDrink }>
          <img src={ drinkIcon } alt="drinkIcon" data-testid="drinks-bottom-btn" />
        </Link>

        <Link to="/explorar">
          <img src={ exploreIcon } alt="exploreIcon" data-testid="explore-bottom-btn" />
        </Link>

        <Link to="/comidas" onClick={ this.fecthRecipe }>
          <img src={ mealIcon } alt="mealIcon" data-testid="food-bottom-btn" />
        </Link>
      </footer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  recipes: () => dispatch(actionRecipes()),
  drinks: () => dispatch(actionDrinks()),
});

DownMenu.propTypes = {
  recipes: PropTypes.func.isRequired,
  drinks: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(DownMenu);
