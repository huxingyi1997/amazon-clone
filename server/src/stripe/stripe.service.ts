import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Stripe } from 'stripe';

import { CartItem } from './dto/cart.dto';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
      {
        apiVersion: '2022-11-15',
      },
    );
  }

  async checkout(
    cart: CartItem[],
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    );

    try {
      const response = await this.stripe.paymentIntents.create({
        amount: +totalPrice.toFixed(2) * 100, // cents
        currency: 'usd', // set currency
        payment_method_types: ['card'],
      });
      return response;
    } catch (error) {
      return error;
    }
  }
}
