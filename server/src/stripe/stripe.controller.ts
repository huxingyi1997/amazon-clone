import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { Stripe } from 'stripe';

import { StripeService } from './stripe.service';
import { CheckoutCartDto, CheckoutCartVo } from './dto/cart.dto';
import { ApiUnifiedCreatedResponse } from 'src/utils';

@ApiTags('stripe')
@ApiBearerAuth()
@ApiExtraModels(CheckoutCartVo)
@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post()
  @ApiUnifiedCreatedResponse(CheckoutCartVo)
  checkout(
    @Body() { cart }: CheckoutCartDto,
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return this.stripeService.checkout(cart);
  }
}
