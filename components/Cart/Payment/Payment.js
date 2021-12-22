import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import FormPayment from "./FormPayment";
import { STRIPE_TOKEN } from "../../../utils/constants";

const stripePrimise = loadStripe(STRIPE_TOKEN, { locale: "en" });

const Payment = (props) => {
  const { products, address } = props;

  return (
    <div className="payment">
      <div className="title">Pay</div>
      <div className="data">
        <Elements stripe={stripePrimise}>
          <FormPayment products={products} address={address} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
