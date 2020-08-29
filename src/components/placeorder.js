import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actionCreators from "../store/actions/index";
import CheckoutSteps from "./checkoutsteps";
import authService from "../services/auth-service";

const Placeorder = (props) => {
  const { cartItems, shipping, payment } = props.cart;
  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }

  const itemsPrice = cartItems.reduce((a, c) => a + parseInt(c.price), 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const user = authService.getCurrentUser();
  const productId = cartItems.map((item) => item.id);
  const newOrder = {
    userId: user.id,
    productId: productId,
    address: shipping.address,
    city: shipping.city,
    postalCode: shipping.postalCode,
    country: shipping.address,
    paymentMethod: payment.paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };

  const placeOrderHandler = () => {
    props.onPlacingOrder(newOrder);
    props.history.push("/");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
            <div>
              {shipping.address}, {shipping.city},{shipping.postalCode},
              {shipping.country},
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>Payment Method: {payment.paymentMethod}</div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>Shopping Cart</h3>
                <div>Price</div>
              </li>
              {cartItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                cartItems.map((item) => (
                  <li key={item.id}>
                    <div className="cart-image">
                      <img
                        src={"data:image/jpeg;base64," + item.image}
                        alt="product"
                      />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.id}>{item.name}</Link>
                      </div>
                    </div>
                    <div className="cart-price">${item.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <button
                className="button primary full-width"
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${totalPrice}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPlacingOrder: (newOrder) =>
      dispatch(actionCreators.createOrder(newOrder)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Placeorder);
