import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchLoginState, clickLogout } from '../actions/auth';


class App extends Component {
  componentWillMount() {
    // this.props.dispatch(fetchLoginState());
  }

  handleLogout() {
    // this.props.dispatch(clickLogout());
  }

  render() {
    const { auth, children } = this.props;

    return (
      <div>
        test
        {children}
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

function select({ auth }) {
  return { auth };
}

export default connect(select)(App);
