import { Body, Controller, Post } from '@nestjs/common';

import { Stripe } from 'stripe';

import { Cart } from './Cart.model';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post()
  checkout(
    @Body() body: { cart: Cart },
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    try {
      return this.stripeService.checkout(body.cart);
    } catch (error) {
      return error;
    }
  }
}
