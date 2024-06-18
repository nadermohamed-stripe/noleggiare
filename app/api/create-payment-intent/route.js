import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



export async function POST(request) {
  try {
    console.log("Received POST request to /api/create-payment-intent");
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 15467,
        currency: "eur", 
        customer: "cus_QGg1WzxIV5LdYe",
        description:"Noleggio auto Linate-Linate",
        automatic_payment_methods: {
            enabled: true,
          },
          setup_future_usage: "off_session", 
        //   return_url: "http://localhost:3000",
    });
    return NextResponse.json({  clientSecret: paymentIntent.client_secret }, { status: 200});
  } catch (error) {
    console.error('Error during payment:', error);
    return NextResponse.json({ error: 'Error during payment' },{ status: 500});
  }
}
