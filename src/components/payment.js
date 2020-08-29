import React, { useState } from "react";
import Form from "react-validation/build/form";

import CheckoutSteps from "./checkoutsteps";
import * as actionCreators from "../store/actions/index";
import { connect } from "react-redux";

const Payment = (props) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const handlePayment = (e) => {
    e.preventDefault();
    props.onPaymentSaved({ paymentMethod });
    props.history.push("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="col-md-12">
        <div className="card card-container">
          <Form onSubmit={handlePayment}>
            {
              <div>
                <h2>Payment</h2>
                <div className="form-group">
                  <input
                    type="radio"
                    name="paymentMethod"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    value="paypal"
                  />
                  <label htmlFor="paymentMethod">Paypal</label>
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
    onPaymentSaved: ({ paymentMethod }) =>
      dispatch(actionCreators.savePayment({ paymentMethod })),
  };
};

export default connect(null, mapDispatchToProps)(Payment);
