import Stripe from "stripe";

export const stripe = (args?: Stripe.StripeConfig | undefined) => {
  return new Stripe(
    "sk_test_51Kxci9GZqFfSTHOMXLz8jrK2e2uoByeZmo2e5yPcZ1otfBdDwr0aRTwohKI6nE11hW0PlsNwZlqTYy1DGfYXdzpz0057zGZdj1",
    args
  );
};
