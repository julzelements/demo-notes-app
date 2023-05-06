import Stripe from "stripe";
import handler from "@notes/core/handler";
import { calculateCost } from "@notes/core/cost";

export const main = handler(async (event: { body: string; }) => {
    const { storage, source } = JSON.parse(event.body);
    const amount = calculateCost(storage);
    const description = "Scratch charge";

    // Load our secret key from the  environment variables
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'unknown', { apiVersion: "2022-11-15" })
    await stripe.charges.create({
        source,
        amount,
        description,
        currency: "usd",
    });

    // TODO: feedback for failure? 
    // logging all attempts?

    return { status: true };
});