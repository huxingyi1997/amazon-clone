import { Injectable } from '@nestjs/common';

import { Stripe } from 'stripe';

import { Cart } from './Cart.model';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async checkout(cart: Cart): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    );
    const response = await this.stripe.paymentIntents.create({
      amount: +totalPrice.toFixed(2) * 100, // cents
      currency: 'usd', // set currency
      payment_method_types: ['card'],
    });
    return response;
  }
}
