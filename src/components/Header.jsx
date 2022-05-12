import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import ImgProfile from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Search from './Search';
import '../Style/Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      redirect: false,
    };
  }

  render() {
    const { header, explorer } = this.props;
    const { search, redirect } = this.state;
    if (redirect) return <Redirect to="/perfil" />;
    return (
      <header>
        <div className="headerInformation">
          <button
            type="button"
            onClick={ () => this.setState({ redirect: true }) }
          >
            <img src={ ImgProfile } alt="perfil" data-testid="profile-top-btn" />
          </button>
          <h2 data-testid="page-title">{header}</h2>
          { explorer
            ? (
              <>
                <button
                  type="button"
                  onClick={ () => this.setState((prev) => ({ search: !prev.search })) }
                >
                  <img
                    src={ searchIcon }
                    alt="icone de busca"
                    data-testid="search-top-btn"
                  />
                </button>
                <div />

              </>)
            : null}
        </div>

        { search ? <Search header={ header } /> : null }
      </header>
    );
  }
}

Header.propTypes = {
  header: PropTypes.string.isRequired,
  explorer: PropTypes.bool.isRequired,
};

export default Header;
