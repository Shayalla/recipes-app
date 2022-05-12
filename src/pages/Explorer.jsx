import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';

class Explorer extends Component {
  render() {
    return (
      <div>
        <Header header="Explorar" explorer={ false } />
        {/* referencias usadas no codigo abaixo https://stackoverflow.com/questions/42463263/wrapping-a-react-router-link-in-an-html-button */}
        <Link to="/explorar/comidas">
          <button
            type="button"
            data-testid="explore-food"
          >
            Explorar Comidas
          </button>
        </Link>

        <Link to="explorar/bebidas">
          <button
            type="button"
            data-testid="explore-drinks"
          >
            Explorar Bebidas
          </button>
        </Link>
        <DownMenu />
      </div>
    );
  }
}

export default Explorer;
