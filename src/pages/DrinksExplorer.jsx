import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';

class DrinksExplorer extends Component {
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
    const random = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const { drinks } = await random.json();
    this.setState({ id: drinks[0].idDrink });
  }

  redirect() {
    this.setState({ redirect: true });
  }

  render() {
    const { id, redirect } = this.state;
    if (redirect) {
      return <Redirect to={ `/bebidas/${id}` } />;
    }
    return (
      <div>
        <Header header="Explorar Bebidas" explorer={ false } />
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
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

export default DrinksExplorer;
