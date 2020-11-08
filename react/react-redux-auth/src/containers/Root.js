import React, { Component } from 'react';
import { Provider} from 'react-redux';
import { BrowserRouter, Route, Link, Switch, Redirect, withRouter } from 'react-router-dom';

import configureStore from '../store/configureStore'

import About from '../components/About'
import Home from '../components/Home'
import NotFound from '../components/NotFound'
import Login from './Login'
import Logout from './Logout'
import AuthenticatedRoute from './AuthenticatedRoute'
import User from '../components/User'

const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Logout />
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/user">User Page</Link>
              </li>
              <li>
                <Link to="/notfound">Not Found</Link>
              </li>
            </ul>

            <hr />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/login" component={Login} />
              <AuthenticatedRoute path="/user" component={User} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}
