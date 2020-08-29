import AdminService from "../../services/admin-service";
import * as actionTypes from "./actionType";

export const setProducts = (products) => {
  return {
    type: actionTypes.SET_PRODUCTS,
    products: products,
  };
};

export const listProductsFailed = () => {
  return {
    type: actionTypes.PRODUCT_LIST_FAIL,
  };
};

export const listProducts = () => {
  return (dispatch) => {
    AdminService.getProducts()
      .then((response) => {
        dispatch(setProducts(response.data));
      })
      .catch((error) => {
        dispatch(listProductsFailed());
      });
  };
};

// export const listProductss = () => async (dispatch) => {
//   try {
//     dispatch({ type: actionTypes.PRODUCT_LIST_REQUEST });
//     const { data } = await AdminService.getProducts();
//     dispatch({ type: actionTypes.PRODUCT_LIST_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: actionTypes.PRODUCT_LIST_FAIL,
//       payload: error.message,
//     });
//   }
// };
