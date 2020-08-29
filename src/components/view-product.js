import React, { Component } from "react";
import AdminService from "../services/admin-service";

class Viewproduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
    };
  }

  componentDidMount() {
    AdminService.getProduct(this.props.match.params.id).then((response) => {
      this.setState({ product: response.data });
    });
  }
  render() {
    return (
      <div>
        <br></br>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center"> View Product Details</h3>
          <div className="card-body">
            <div className="row">
              <img
                src={
                  "data:image/jpeg;base64," +
                  (this.state.product && this.state.product.image)
                }
                alt="product-img"
                height="50"
                width="50"
              />
            </div>
            <div className="row">
              <label> Product Name: </label>
              <div> {this.state.product && this.state.product.name}</div>
            </div>
            <div className="row">
              <label> Category: </label>
              <div> {this.state.product && this.state.product.category}</div>
            </div>
            <div className="row">
              <label> Price: </label>
              <div> $ {this.state.product && this.state.product.price}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Viewproduct;
