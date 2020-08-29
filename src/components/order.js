import React, { Component } from "react";
import { connect } from "react-redux";
import authService from "../services/auth-service";
import * as actionCreators from "../store/actions/index";
import { Link } from "react-router-dom";

class Order extends Component {
  constructor(props) {
    super(props);
    this.userId = authService.getCurrentUser().id;
  }
  componentDidMount() {
    if (this.userId) {
      this.props.onListMyOrders(this.userId);
    }
  }

  render() {
    return (
      <div className="orders content-margined">
        {(this.props.myOrderList.length && this.props.myOrderList.length) ===
        0 ? (
          <h4>You haven't ordered anything</h4>
        ) : (
          <div>
            <h2>Your Orders</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>ORDER_ID</th>
                  <th>ORDER_TOTAL</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {this.props.myOrderList &&
                  this.props.myOrderList.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        <Link to={"/order/" + order.id}>DETAILS</Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    myOrderList: state.myOrderList.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onListMyOrders: (userId) => dispatch(actionCreators.listMyOrders(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
