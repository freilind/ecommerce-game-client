import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { size, map } from "lodash";
import useAuth from "../../../../hooks/useAuth";
import useCart from "../../../../hooks/useCart";
import { paymentCartApi } from "../../../../api/cart";
import { listTdc } from "../../../../data/tdc";

const FormPayment = (props) => {
  const { products, address } = props;
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { auth, logout } = useAuth();
  const { removeAllProductsCart } = useCart();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);

    if (result.error) {
      toast.error(result.error.message);
    } else {
      const response = await paymentCartApi(
        result.token,
        products,
        auth.idUser,
        address,
        logout
      );

      if (size(response) > 0) {
        toast.success("Order complete.");
        removeAllProductsCart();
        router.push("/orders");
      } else {
        toast.error("Error with order.");
      }
    }

    setLoading(false);
  };

  const _options = {
    value: { postalCode: "10845" },
  };

  return (
    <>
      <form className="form-payment" onSubmit={handleSubmit}>
        <CardElement options={_options} />
        <Button type="submit" loading={loading} disabled={!stripe}>
          Pay
        </Button>
      </form>

      <table class="ui celled table">
        <thead>
          <tr>
            <th>Number</th>
            <th>Brand</th>
            <th>Date</th>
            <th>CVC</th>
            <th>Zip</th>
          </tr>
        </thead>
        <tbody>
          {map(listTdc, (tdc) => (
            <tr key={tdc.number}>
              <td data-label="Number">{tdc.number}</td>
              <td data-label="Brand">{tdc.brand}</td>
              <td data-label="Date">{tdc.date}</td>
              <td data-label="CVC">{tdc.cvc}</td>
              <td data-label="Zip">{tdc.zip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default FormPayment;
