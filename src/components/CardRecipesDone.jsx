import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import imagem from '../images/shareIcon.svg';

class CardRecipesDone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      click: false,
    };

    this.button = this.button.bind(this);
  }

  button(index, id, image, type) {
    return (
      <button
        type="button"
        src="shareIcon"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => {
          copy(`http://localhost:3000/${type}/${id}`);
          this.setState({ click: true });
        } }
      >
        <img src={ image } alt="botão de compartilhar" />
      </button>);
  }

  render() {
    const { click } = this.state;
    const { recipe, index } = this.props;
    const { id, type, name, category, doneDate, image, tags, area } = recipe;
    // console.log(id);
    return (
      <div>
        <Link to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }>
          <img
            width="30px"
            src={ image }
            alt={ image }
            data-testid={ `${index}-horizontal-image` }
          />
          <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
        </Link>
        <p>{area}</p>
        <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>
        <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
        {type === 'comida'
          ? this.button(index, id, imagem, 'comidas')
          : this.button(index, id, imagem, 'bebidas')}
        {click ? <p>Link copiado!</p> : null }
        {tags.map((tag) => (
          <p key={ index } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
        ))}
      </div>
    );
  }
}

CardRecipesDone.propTypes = {
  recipe: PropTypes.arrayOf().isRequired,
  index: PropTypes.number.isRequired,
};

export default CardRecipesDone;
