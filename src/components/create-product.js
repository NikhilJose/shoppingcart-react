import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import axios from "axios";
import authHeader from "../services/auth-header";
import AdminService from "../services/admin-service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      category: "",
      imageURL: null,
      price: "",
      selectedFile: [],
      successful: false,
      message: "",
    };
    this.handleCreateProduct = this.handleCreateProduct.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value,
    });
  }

  onChangeFile(e) {
    let files = e.target.files;
    this.setState(
      {
        imageURL: URL.createObjectURL(files[0]),
        selectedFile: files[0],
      },
      () => {}
    );
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
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
      .post("http://localhost:8080/api/admin/upload", uploadData, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.status === 200) {
          AdminService.addProduct(
            this.state.name,
            this.state.category,
            this.state.price
          );
        }
        this.setState({
          message: response.data.message,
          successful: true,
        });
        window.location.reload();
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
          {!this.state.successful && (
            <div>
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChangeName}
                  validations={[required]}
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
                  validations={[required]}
                ></Input>
              </div>
              <div className="form-group">
                <Input
                  type="file"
                  onChange={(e) => this.onChangeFile(e)}
                  validations={[required]}
                />
                <img
                  src={this.state.imageURL}
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
                  validations={[required]}
                ></Input>
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">
                  Add Product
                </button>
              </div>
            </div>
          )}

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

export default CreateProduct;
