"use client";

import React, { useState } from 'react';
import { ExpressCheckoutElement, useStripe, useElements } from '@stripe/react-stripe-js';

const ExpressCheckout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);

    const onConfirm = async (event) => {
        if (!stripe) {
            // Stripe.js hasn't loaded yet.
            return;
        }

        const { error: submitError } = await elements.submit();
        if (submitError) {
            setErrorMessage(submitError.message);
            return;
        }

        // Create the PaymentIntent and obtain clientSecret
        const res = await fetch('/api/create-payment-intent', {
            method: 'POST',
        });
        const { clientSecret } = await res.json();

        // Confirm the PaymentIntent using the details collected by the Express Checkout Element
        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: 'https://example.com/success',
            },
        });

        if (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div id="express-checkout" className='mb-4'>
            {elements && <ExpressCheckoutElement onConfirm={onConfirm} />}
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
};

export default ExpressCheckout;