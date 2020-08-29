import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://fullstack-shoppingcart.herokuapp.com/api/admin/";

class AdminService {
  getUsers() {
    return axios.get(API_URL + "users", { headers: authHeader() });
  }

  getUser(userId) {
    return axios.get(API_URL + "users/" + userId, {
      headers: authHeader(),
    });
  }

  addProduct(name, category, price) {
    return axios.post(
      API_URL + "add",
      { name, category, price },
      { headers: authHeader() }
    );
  }

  getProducts() {
    return axios.get(API_URL + "products", { headers: authHeader() });
  }

  getProduct(productId) {
    return axios.get(API_URL + "products/" + productId, {
      headers: authHeader(),
    });
  }

  editProduct(productId, product) {
    return axios.put(API_URL + "products/" + productId, product, {
      headers: authHeader(),
    });
  }

  deleteProduct(productId) {
    return axios.delete(API_URL + "products/" + productId, {
      headers: authHeader(),
    });
  }
}

export default new AdminService();
