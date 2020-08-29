import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import CheckoutSteps from "./checkoutsteps";
import * as actionCreators from "../store/actions/index";
import { connect } from "react-redux";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Shipping = (props) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const handleShipping = (e) => {
    e.preventDefault();

    props.onShippingSaved({ address, city, postalCode, country });

    props.history.push("/payment");
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="col-md-12">
        <div className="card card-container">
          <Form onSubmit={handleShipping}>
            {
              <div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="city"
                    onChange={(e) => setCity(e.target.value)}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code</label>
                  <Input
                    type="postalCode"
                    className="form-control"
                    name="postalCode"
                    onChange={(e) => setPostalCode(e.target.value)}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <Input
                    type="postalCode"
                    className="form-control"
                    name="postalCode"
                    onChange={(e) => setCountry(e.target.value)}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <button className="button primary full-width">
                    Continue
                  </button>
                </div>
              </div>
            }
          </Form>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onShippingSaved: ({ address, city, postalCode, country }) =>
      dispatch(
        actionCreators.saveShipping({ address, city, postalCode, country })
      ),
  };
};

export default connect(null, mapDispatchToProps)(Shipping);
