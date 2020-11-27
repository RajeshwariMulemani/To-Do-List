import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

import SelectListGroup from '../common/SelectListGroup';

class Navbar extends Component {

  constructor() {
    super();
    this.state = {
      usertype:'',
     
    };
  }
  onLogoutClick(e) {
    e.preventDefault();
   
    this.props.logoutUser();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

 

  render() {
    const { isAuthenticated, user } = this.props.auth;
    let options = [{keys:"user", value:"user",label:"Employee Login"},{keys:"admin", value:"admin",label:"Admin Login"}]

    const authLinks = (
      <ul className="navbar-nav ml-auto">
       
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
           <img
              className="rounded-circle"
              src="https://i.ibb.co/6DmS7tt/image.png"
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="profile image"
            />{' '}
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
      
        <Link className="nav-link" to="/login">
            Login
          </Link>
         
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

            {isAuthenticated ? authLinks : guestLinks}
       
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(
  Navbar
);
