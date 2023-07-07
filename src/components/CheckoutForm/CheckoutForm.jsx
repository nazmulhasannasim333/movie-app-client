import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CheckoutForm = ({loadedSubcription}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [axiosSecure] = useAxiosSecure();
    const {user} = useAuth()
    const navigate = useNavigate()

    const price = parseFloat(loadedSubcription.price.toFixed(2));


  // create payment intant, and post data
  useEffect(() => {
    if(price > 0){
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!stripe || !elements) {
          return;
        }
    
        const card = elements.getElement(CardElement);
        if (card === null) {
          return;
        }
        console.log('card', card);
    
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card,
        });
    
        if (error) {
          setTransactionId("");
          console.log("[error]", error);
          setCardError(error.message);
        } else {
          setCardError("");
          console.log("[PaymentMethod]", paymentMethod);
        }
    
        setProcessing(true);
        const { paymentIntent, error: confirmError } =
          await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: card,
              billing_details: {
                email: user?.email || "unknown",
                name: user?.displayName || "anonymous",
              },
            },
          });
    
        if (confirmError) {
          console.log("confirmError", confirmError);
        }
        setProcessing(false);
        console.log(paymentIntent);
        if (paymentIntent.status === "succeeded") {
          setTransactionId(paymentIntent.id);

          axios.patch(`https://movie-app-server-nazmulhasannasim333.vercel.app/subscriptionStatus/${user?.email}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              toast.success("status paid")
            }
          });



          const { _id, package_name, price } = loadedSubcription;
          const payment = {
            email: user?.email,
            name: user?.displayName,
            transactionId: paymentIntent.id,
            price,
            subscriptionPackageId: _id,
            package_name
          };
          axiosSecure.post("/payment", payment).then((res) => {
            if (res.data.insertedId) {
                navigate("/")
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your payment has been successful",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      };



    return (
        <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <div className="text-center mt-12">
            <button disabled={!stripe ||!clientSecret || processing} className='text-white bg-blue-500 px-20 py-3 rounded-sm'>Pay</button>
        </div>
        {cardError && (
        <p className="text-red-500 mt-10 text-center">{cardError}</p>
      )}    
      {transactionId && (
        <p className="text-green-500 mt-10 text-center">
          Payment Success with transacition ID: {transactionId}
        </p>
      )}
      </form>
    );
};

export default CheckoutForm;