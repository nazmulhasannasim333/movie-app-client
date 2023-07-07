import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import "./style.scss";
const stripePromise = loadStripe(import.meta.env.VITE_stripe_payment_PK);

const Payment = () => {
  const loadedSubcription = useLoaderData();
  console.log(loadedSubcription);

  return (
    <div className="paymentPage">
      <ContentWrapper>
        <h3 className="text-white text-center text-3xl">Payment Now</h3>

        <div className="max-w-3xl mx-auto my-32 bg-white py-10 px-16">
          <Elements stripe={stripePromise}>
            <CheckoutForm loadedSubcription={loadedSubcription} />
          </Elements>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Payment;
