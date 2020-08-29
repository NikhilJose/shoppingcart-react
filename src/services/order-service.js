import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/order/";

class OrderService {
  createOrder(order) {
    return axios.post(API_URL + "createorder", order, {
      headers: authHeader(),
    });
  }

  listMyOrders(userId) {
    return axios.get(API_URL + "myorder/" + userId, {
      headers: authHeader(),
    });
  }
}

export default new OrderService();
