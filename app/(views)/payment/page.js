"use client";

import { useState, useEffect } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '@/app/components/CheckoutForm';
import ExpressCheckout from '@/app/components/ExpressCheckout';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Home() {
    const [clientSecret, setClientSecret] = useState("");
    const [stripeLoaded, setStripeLoaded] = useState(false);

    useEffect(() => {
      stripePromise.then(() => {
        setStripeLoaded(true);
      });

      // Create PaymentIntent as soon as the page loads
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Received client secret:", data.clientSecret); // Debug log
          setClientSecret(data.clientSecret);
        })
        .catch((error) => console.error("Error fetching client secret:", error));
    }, []);

    const appearance = {
      theme: 'minimal',
      variables: { colorPrimaryText: '#262626' }
    };

    const options = {
      clientSecret,
      appearance,
    };

    if (!stripeLoaded || !clientSecret) {
      return <div>Loading...</div>; // or a loading spinner
    }

    return (
        <div className="bg-white min-h-screen flex flex-col">
        <div className="grid grid-cols-1">
            <div className=''>
            <img
                src="./topbar.png"
                alt=""
                usemap="#image-map"
            />
            </div>
        </div>
        <hr style={{ border: '1px solid black' }} />
        <div className="grid grid-cols-2">
            <div className='flex justify-center items-center p-4'>
            <div className="w-62 h-54 rounded-lg overflow-hidden">
                <img
                src="./car.png"
                alt="Car"
                className="w-full h-full object-cover"
                usemap="#image-map"
                />
            </div>
            </div>
            <div className='mt-24 mr-4'>
            <Elements options={options} stripe={stripePromise}>
                <ExpressCheckout />
                <CheckoutForm />
            </Elements>
            </div>
        </div>
        </div>
    );
}