import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import axios from "axios";
import authHeader from "../services/auth-header";
import AminService from "../services/admin-service";


class Editproduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: "",
      category: "",
      imageURL: null,
      selectedFile: [],
      price: "",
      imageToggle: true,
    };
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.handleCreateProduct = this.handleCreateProduct.bind(this);
  }

  componentDidMount() {
    AminService.getProduct(this.state.id).then((response) => {
      let product = response.data;
      this.setState({
        name: product.name,
        category: product.category,
        imageURL: product.image,
        price: product.price,
      });
    });
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeCategory(e) {
    this.setState({ category: e.target.value });
  }

  onChangeFile(e) {
    let files = e.target.files;
    this.setState({ files: files[0] });
    this.setState(
      {
        imageURL: URL.createObjectURL(e.target.files[0]),
        selectedFile: files[0],
        imageToggle: !this.state.imageToggle,
      },
      () => {
        console.log(this.state.selectedFile);
      }
    );
  }

  onChangePrice(e) {
    this.setState({ price: e.target.value });
  }

  handleCreateProduct(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    const uploadData = new FormData();
    uploadData.append(
      "imageFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    axios
      .post("http://localhost:8080/api/product/upload", uploadData, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.status === 200) {
          let product = {
            name: this.state.name,
            category: this.state.category,
            price: this.state.price,
          };
          AminService.editProduct(this.state.id, product);
        }
      })
      .then(() => {
        this.props.history.push("/products");
      });
  }

  render() {
    return (
      <div className="card card-container">
        <Form
          onSubmit={this.handleCreateProduct}
          ref={(c) => {
            this.form = c;
          }}
        >
          {
            <div>
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChangeName}
                ></Input>
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <Input
                  type="text"
                  className="form-control"
                  name="category"
                  value={this.state.category}
                  onChange={this.onChangeCategory}
                ></Input>
              </div>
              <div className="form-group">
                <Input type="file" onChange={(e) => this.onChangeFile(e)} />
                <img
                  src={
                    this.state.imageToggle
                      ? "data:image/jpeg;base64," + this.state.imageURL
                      : this.state.imageURL
                  }
                  height="200"
                  width="200"
                  alt=""
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Price</label>
                <Input
                  type="text"
                  className="form-control"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChangePrice}
                ></Input>
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">
                  Edit Product
                </button>
              </div>
            </div>
          }

          {this.state.message && (
            <div className="form-group">
              <div
                className={
                  this.state.successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {this.state.message}
              </div>
            </div>
          )}
        </Form>
      </div>
    );
  }
}

export default Editproduct;
