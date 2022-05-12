import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';

class RecipesExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      redirect: false,
    };
    this.getRandom = this.getRandom.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    this.getRandom();
  }

  async getRandom() {
    const random = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const { meals } = await random.json();
    this.setState({ id: meals[0].idMeal });
  }

  redirect() {
    this.setState({ redirect: true });
  }

  render() {
    const { id, redirect } = this.state;
    if (redirect) {
      return <Redirect to={ `/comidas/${id}` } />;
    }
    return (
      <div>
        <Header
          header="Explorar Comidas"
          explorer={ false }
        />
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>

        <Link to="/explorar/comidas/area">
          <button
            type="button"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </button>
        </Link>

        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ this.redirect }
        >
          Me Surpreenda!
        </button>

        <DownMenu />
      </div>
    );
  }
}

export default RecipesExplorer;
