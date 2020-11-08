import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Redirect, withRouter } from 'react-router-dom';

const Root = () => (
  <BrowserRouter>
    <div>
      <AuthButton />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
        <li>
          <Link to="/notfound">Not Found</Link>
        </li>
      </ul>

      <hr />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/protected" component={Protected} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </BrowserRouter>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Protected = () => (
  <div>
    <h2>Protected</h2>
  </div>
)

const NoMatch = ({ location }) => (
  <div>
    <h2>404 Not Found</h2>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/prop-v-state`}>Prop v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicid`} component={Topic} />
    <Route exact path={match.url} render={() => <h3>Please Select Topics</h3>} />
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{ match.params.topicid }</h3>
  </div>
);

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
}

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>You must login to view the page at {from.pathname}</p>
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcom! {" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

render(
  <Root />,
  document.getElementById('root')
);
