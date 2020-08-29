import AdminService from "../../services/admin-service";
import * as actionTypes from "./actionType";

export const addToCartFailed = () => {
  return { type: actionTypes.CART_ADD_ITEM_FAILED };
};

export const addToCart = (productId) => {
  return (dispatch, getState) => {
    AdminService.getProduct(productId)
      .then((response) => {
        dispatch({
          type: actionTypes.ADD_CART_ITEM,
          cartItems: {
            id: response.data.id,
            name: response.data.name,
            category: response.data.category,
            image: response.data.image,
            price: response.data.price,
          },
        });
        const cartItems = getState().cart.cartItems;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      })
      .catch((e) => {
        dispatch(addToCartFailed());
      });
  };
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: actionTypes.REMOVE_CART_ITEM, payload: productId });
  const cartItems = getState().cart.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const saveShipping = (data) => (dispatch) => {
  dispatch({ type: actionTypes.CART_SAVE_SHIPPING, payload: data });
};

export const savePayment = (data) => (dispatch) => {
  dispatch({ type: actionTypes.CART_SAVE_PAYMENT, payload: data });
};
