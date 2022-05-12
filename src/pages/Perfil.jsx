import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';

class Perfil extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   email: '',
    // };

    this.getEmail = this.getEmail.bind(this);
    this.clearLocalStorage = this.clearLocalStorage.bind(this);
  }

  getEmail() {
    const { emailRedux } = this.props;
    const emailObj = localStorage.getItem('user');
    if (!emailObj) return emailRedux;
    const { email } = JSON.parse(emailObj);
    return email;
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  render() {
    // const { email } = this.state;
    return (
      <div>
        <Header header="Perfil" />
        <h1 data-testid="profile-email">{this.getEmail()}</h1>
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ this.clearLocalStorage }
          >
            Sair
          </button>
        </Link>
        <DownMenu />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailRedux: state.user.email,
});

Perfil.propTypes = {
  emailRedux: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Perfil);
