import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/index";


class Home extends Component {
  
  componentDidMount() {
    this.props.onListProducts();
  }

  handleAddToCart(id) {
    this.props.history.push(`/cart/${id}`);
  }

  render() {
    return this.props.error ? (
      <div>{this.props.error}</div>
    ) : (
      <div className="container row ">
        {this.props.products &&
          this.props.products.map((product) => (
            <div className="col-md-4" key={product.id}>
              <div className="card card-block">
                <img
                  src={"data:image/jpeg;base64," + product.image}
                  alt="product-img"
                  height="150"
                  width="150"
                  style={({ marginLeft: "60px" }, { marginTop: "10px" })}
                />
                <div>
                  <p style={{ marginLeft: "60px" }}>
                    <strong>
                      {product.name}:${product.price}
                    </strong>
                  </p>
                </div>
                <div className="offset-md-4">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => this.handleAddToCart(product.id)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productList.products,
    error: state.productList.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onListProducts: () => dispatch(actionCreators.listProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

