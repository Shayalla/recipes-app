import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import
{ actionRecipesByIngredients,
  actionRecipesByName,
  actionRecipesByFirstLetter,
  actionDrinksByIngredients,
  actionDrinksByName, actionDrinksByFirstLetter } from '../actions';
import '../Style/SearchBar.css';

const messageAlert = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      filter: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleChange(e) {
    this.setState({ search: e.target.value });
    const { search } = this.state;
    console.log(search);
  }

  handleFilter() {
    const { header, ingredientes, name, firstName,
      ingredientesBebidas, nameBebidas, firstNameBebidas } = this.props;
    const { search, filter } = this.state;
    if (header === 'Comidas') {
      switch (filter) {
      case 'ingredients':
        return ingredientes(search);
      case 'name':
        return name(search);
      case 'firstLetter':
        if (search.length > 1) {
          return window.alert('Sua busca deve conter somente 1 (um) caracter');
        }
        return firstName(search);
      default:
        return window.alert(messageAlert);
      }
    }
    switch (filter) {
    case 'ingredients':
      return ingredientesBebidas(search);
    case 'name':
      return nameBebidas(search);
    case 'firstLetter':
      if (search.length > 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      return firstNameBebidas(search);
    default:
      return global.alert(messageAlert);
    }
  }

  render() {
    const { search } = this.state;
    return (
      <div className="search">
        <div className="optionsSearch">
          <label htmlFor="search">
            <input
              type="text"
              name="search"
              value={ search }
              data-testid="search-input"
              onChange={ ({ target: { value } }) => {
                this.setState({ search: value });
              } }
            />
          </label>
          <div>
            <label htmlFor="ingredients">
              <input
                type="radio"
                name="filter"
                id="ingredients"
                value="ingredients"
                data-testid="ingredient-search-radio"
                onClick={ ({ target: { value } }) => {
                  this.setState({ filter: value });
                } }
              />
              Ingredientes
            </label>

            <label htmlFor="name">
              <input
                type="radio"
                name="filter"
                id="name"
                value="name"
                data-testid="name-search-radio"
                onClick={ ({ target: { value } }) => {
                  this.setState({ filter: value });
                } }
              />
              Nome
            </label>

            <label htmlFor="firstLetter">
              <input
                type="radio"
                name="filter"
                id="firstLetter"
                value="firstLetter"
                data-testid="first-letter-search-radio"
                onClick={ ({ target: { value } }) => {
                  this.setState({ filter: value });
                } }
              />
              Primeira letra
            </label>
          </div>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => {
            this.handleFilter();
          } }
        >
          Buscar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  ingredientes: (ingredientes) => dispatch(actionRecipesByIngredients(ingredientes)),
  name: (name) => dispatch(actionRecipesByName(name)),
  firstName: (firstName) => dispatch(actionRecipesByFirstLetter(firstName)),
  ingredientesBebidas: (par) => dispatch(actionDrinksByIngredients(par)),
  nameBebidas: (name) => dispatch(actionDrinksByName(name)),
  firstNameBebidas: (firstName) => dispatch(actionDrinksByFirstLetter(firstName)),
});

Search.propTypes = {
  header: PropTypes.string.isRequired,
  ingredientes: PropTypes.func.isRequired,
  name: PropTypes.func.isRequired,
  firstName: PropTypes.func.isRequired,
  ingredientesBebidas: PropTypes.func.isRequired,
  nameBebidas: PropTypes.func.isRequired,
  firstNameBebidas: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Search);
