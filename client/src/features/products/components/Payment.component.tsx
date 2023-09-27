import { FC, FormEvent, useEffect, useState } from "react";

import { StripeCardElement, loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

import { baseAPI, stripeSecretKey } from "../../constant";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { resetCart } from "../productSlice";

const PaymentComponent: FC = () => {
  const { cart } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<string>("");

  const stripe = useStripe();
  const elements = useElements();

  const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (totalQty === 0) return;

    if (paymentStatus !== "succeeded") return;

    dispatch(resetCart());
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (totalQty === 0) return;

    if (!stripe || !elements) return;

    const cardEl: StripeCardElement = elements.getElement(CardElement)!;

    setIsProcessing(true);

    try {
      const url = `${baseAPI}/stripe`;
      const res = await axios.post(url, { cart });

      const { client_secret: clientSecret } = res.data;

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardEl,
        },
      });

      if (!paymentIntent) {
        setPaymentStatus("Payment failed!");
      } else {
        setPaymentStatus(paymentIntent.status);
      }
    } catch (error) {
      console.error("Payment error: ", error);
      setPaymentStatus("Payment failed!");
    }

    setIsProcessing(false);
  };

  return (
    <div style={{ fontSize: "20px" }}>
      <form onSubmit={handleSubmit} id="payment-form">
        <label htmlFor="card-element">Place order</label>
        <CardElement id="card-element" />
        {!isProcessing && (
          <button
            style={{
              marginTop: "16px",
              height: "31px",
              backgroundColor: "#f0c14b",
              color: "black",
              display: "flex",
              fontWeight: 600,
              fontSize: "20px",
              padding: "24px",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Pay
          </button>
        )}
        {isProcessing && <div>Processing...</div>}
        {!isProcessing && paymentStatus && <div>Status: {paymentStatus}</div>}
      </form>
    </div>
  );
};

const PaymentGateway = () => {
  const stripePromise = loadStripe(stripeSecretKey);

  return (
    <Elements stripe={stripePromise}>
      <PaymentComponent />
    </Elements>
  );
};

export default PaymentGateway;
