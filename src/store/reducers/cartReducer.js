import * as actionTypes from "../actions/actionType";

const cartReducer = (
  state = { cartItems: [], shipping: {}, payment: {} },
  action
) => {
  switch (action.type) {
    case actionTypes.ADD_CART_ITEM:
      const addedItem = action.cartItems;
      const product = state.cartItems.find((x) => x.id === addedItem.id);
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.id === product.id ? addedItem : x
          ),
        };
      }
      return { cartItems: [...state.cartItems, addedItem] };

    case actionTypes.REMOVE_CART_ITEM:
      return {
        cartItems: state.cartItems.filter((x) => x.id !== action.payload),
      };

    case actionTypes.CART_SAVE_SHIPPING:
      return {
        ...state,
        shipping: action.payload,
      };
    case actionTypes.CART_SAVE_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
