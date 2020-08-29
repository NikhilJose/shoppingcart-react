import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actionCreators from "../store/actions/index";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.productId = this.props.match.params.id;
  }

  componentDidMount() {
    if (this.productId) {
      this.props.onItemAdded(this.productId);
    }
  }

  checkoutHandler = () => {
    this.props.history.push("/login?redirect=shipping");
  };
  removeFromCartHandler = (productId) => {
    this.props.onRemoveItem(productId);
  };
  render() {
    return (
      <div className="cart">
        <div className="cart-list">
          <ul className="cart-list-container">
            <li>
              <h3>Items</h3>
              <h3>Price</h3>
            </li>
            {(this.props.cartItems.length && this.props.cartItems.length) ===
            0 ? (
              <div>Cart is empty</div>
            ) : (
              this.props.cartItems &&
              this.props.cartItems.map((item) => (
                <li key={item.id}>
                  <div className="cart-image">
                    <img
                      src={"data:image/jpeg;base64," + item.image}
                      alt="product-img"
                    />
                  </div>
                  <div className="cart-name">
                    <div>
                      <Link to={"/product/" + item.id}>{item.name}</Link>
                    </div>
                    <button
                      type="button"
                      className="button"
                      onClick={() => this.removeFromCartHandler(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="cart-price">${item.price}</div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="cart-action">
          <h3>
            Subtotal : ${" "}
            {this.props.cartItems &&
              this.props.cartItems.reduce((a, c) => a + parseInt(c.price), 0)}
          </h3>
          <button
            onClick={this.checkoutHandler}
            className="button primary full-width"
            disabled={this.props.cartItems.length && this.props.cartItems === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onItemAdded: (id) => dispatch(actionCreators.addToCart(id)),
    onRemoveItem: (id) => dispatch(actionCreators.removeFromCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
