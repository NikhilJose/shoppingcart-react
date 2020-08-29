import OrderService from "../../services/order-service";
import * as actionTypes from "./actionType";

export const createOrderFailed = () => {
  return { type: actionTypes.CREATE_ORDER_FAILED };
};

export const createOrder = (order) => {
  return (dispatch) => {
    OrderService.createOrder(order)
      .then((response) => {
        dispatch({
          type: actionTypes.CREATE_ORDER,
          payload: response.data,
        });
      })
      .catch((e) => {
        dispatch(createOrderFailed());
      });
  };
};

export const listMyOrdersFailed = () => {
  return { type: actionTypes.LIST_ORDER_FAILED };
};

export const listMyOrders = (userId) => {
  return (dispatch) => {
    OrderService.listMyOrders(userId)
      .then((response) => {
        dispatch({
          type: actionTypes.LIST_MY_ORDER,
          payload: response.data,
        });
      })
      .catch((e) => {
        dispatch(listMyOrdersFailed());
      });
  };
};