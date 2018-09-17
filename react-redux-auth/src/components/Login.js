import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';


export default class Login extends Component {
  constructor(props) {
    super(props)
  };

  render() {
    console.log(this.props)
    const { auth, history, onSubmit } = this.props
    const { from } = history.location.state || { from: { pathname: "/" } };
    console.log("login")
    console.log(from)

    console.log(auth.isFetching)

    if (auth.redirectToReferrer) {
      return <Redirect to={from} />;
    }

    if (auth.user) {
      return <Redirect to={{ pathname: "/" }} />;
    }

    if (auth.isFetching) {
      return (
        <div>
          During authentication
        </div>
      )
    }

    return (
      <div>
        <p>You must login to view the page at {from.pathname}</p>
        <form onSubmit={onSubmit}>
          <p>name: <input type="text" name="name" required /></p>
          <p>password: <input type="text" name="password" required /></p>
          <input type="submit" value="login"/>
        </form>
      </div>
    );
  }
}


Login.propTypes = {
  auth: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}
