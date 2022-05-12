import React, { Component } from 'react';
import CardRecipesDone from '../components/CardRecipesDone';
import Header from '../components/Header';
import dataRecipesDone from '../dataRecipesDone';
import '../Style/Recipes.css';

class RecipesDone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipesDone: [],
      filter: false,
      filtered: [],
    };

    this.getLocalRecipes = this.getLocalRecipes.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.mapList = this.mapList.bind(this);
  }

  componentDidMount() {
    this.getLocalRecipes();
  }

  handleClick(type) {
    const { recipesDone } = this.state;
    if (type !== '') {
      const result = recipesDone.filter((recipe) => recipe.type === type);
      this.setState({
        filtered: result,
        filter: true,
      });
    } else {
      this.setState({ filter: false });
    }
  }

  getLocalRecipes() {
    // const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
    this.setState({ recipesDone: dataRecipesDone });
  }

  mapList(recipe, index) {
    return (
      <div key={ index }>
        <CardRecipesDone
          recipe={ recipe }
          index={ index }
        />
      </div>);
  }

  render() {
    const { recipesDone, filter, filtered } = this.state;
    return (
      <div>
        <Header header="Receitas Feitas" />
        <h2> Recipes Done</h2>
        <h2> Recipes Done</h2>
        <h2> Recipes Done</h2>
        <h2> Recipes Done</h2>
        <h2> Recipes Done</h2>
        <button
          type="button"
          className="button"
          data-testid="filter-by-all-btn"
          onClick={ () => this.handleClick('') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => this.handleClick('comida') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => this.handleClick('bebida') }
        >
          Drinks
        </button>
        {filter
          ? filtered.map((recipe, index) => this.mapList(recipe, index))
          : recipesDone.map((recipe, index) => this.mapList(recipe, index)) }
      </div>
    );
  }
}

export default RecipesDone;
