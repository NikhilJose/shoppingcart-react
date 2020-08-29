import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth-service";

import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import Profile from "./components/profile";
import User from "./components/user";
import Product from "./components/product";
import Viewproduct from "./components/view-product";
import Editproduct from "./components/edit-product";
import Viewuser from "./components/view-user";
import Cart from "./components/cart";
import Shipping from "./components/shipping";
import Payment from "./components/payment";
import Placeorder from "./components/placeorder";
import Order from "./components/order";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              NJ Mart
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/products"} className="nav-link">
                    Products
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    Users
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="#" className="nav-link">
                    <i className="material-icons">shopping_cart</i>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/myorder"} className="nav-link">
                    Orders
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/user" component={User} />
              <Route exact path="/products" component={Product} />
              <Route path="/shipping" component={Shipping} />
              <Route path="/payment" component={Payment} />
              <Route path="/placeorder" component={Placeorder} />
              <Route
                exact
                path="/view-product/:id"
                component={Viewproduct}
              ></Route>
              <Route
                exact
                path="/edit-product/:id"
                component={Editproduct}
              ></Route>
              <Route exact path="/view-user/:id" component={Viewuser}></Route>
              <Route exact path="/cart/:id" component={Cart} />
              <Route exact path="/myorder" component={Order} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
