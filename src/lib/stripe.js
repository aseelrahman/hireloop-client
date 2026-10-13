import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
  seeker_pro: "price_1UQ4ecC4oFfClwRVhvJhFPBV",
  seeker_premium: "price_1UQCdYC4oFfClwRVOO2oWtTV",
  recruiter_enterprise: "price_1UQCcMC4oFfClwRVRJosZuPI",
  recruiter_growth: "price_1UQCcqC4oFfClwRVuGmLY9Lr",
};
