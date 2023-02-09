import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderTrendService } from '../services/ordertrend.service';
import { OrderData } from '../dtos/orderTrendDto';

@Resolver('Ordertrend')
export class OrdertrendResolver {
  constructor(private readonly ordertrendService: OrderTrendService) {}

  @Query(()=> [OrderData],{name: 'ordertrend'})
  getLastData(@Args('days', { type: () => Int }) days: number){
    return this.ordertrendService.getLastXDays(days);
  }
  
}
