import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
          <div className="container">
            <Link to="/" className="navbar-brand">FullStack Challenge</Link>

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Households</Link>
                </li>
              </ul>
              <Link to="/households/new" className="btn btn-outline-success">New Household</Link>
            </div>
          </div>
        </nav>

        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

// Typechecking
App.propTypes = {
  children: PropTypes.element
};

export default App;
