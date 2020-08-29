import * as actionTypes from "../actions/actionType";

const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ORDER:
      return { order: action.payload };

    default:
      return state;
  }
};

const myOrderListReducer = (
  state = {
    orders: [],
  },
  action
) => {
  switch (action.type) {
    case actionTypes.LIST_MY_ORDER:
      return { orders: action.payload };
    default:
      return state;
  }
};

export { orderCreateReducer, myOrderListReducer };
