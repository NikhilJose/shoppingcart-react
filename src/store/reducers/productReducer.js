import * as actionCreators from "../actions/actionType";

const initialState = {
  products: [],
  error: false,
};

const productListReducer = (state = { initialState }, action) => {
  switch (action.type) {
    case actionCreators.SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
        error: false,
      };
    case actionCreators.PRODUCT_LIST_FAIL:
      return { ...state, error: true };
    default:
      return state;
  }
};
export default productListReducer;
