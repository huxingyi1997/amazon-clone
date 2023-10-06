import { Body, Controller, Post } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

import { Stripe } from 'stripe';

import { StripeService } from './stripe.service';
import { CheckoutCartDto } from './dto/cart.dto';

@ApiTags('stripe')
@ApiHeader({
  name: 'Authorization',
  description: 'Auth token',
})
@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post()
  checkout(
    @Body() { cart }: CheckoutCartDto,
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return this.stripeService.checkout(cart);
  }
}
