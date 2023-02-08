import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrdertrendService } from '../services/ordertrend.service';
import { OrderData } from '../dtos/orderTrendDto';

@Resolver('Ordertrend')
export class OrdertrendResolver {
  constructor(private readonly ordertrendService: OrdertrendService) {}


  @Query(()=> [OrderData],{name: 'ordertrend'})
  getData(@Args('days', { type: () => Int }) days: number){
    return this.ordertrendService.getLastXDays(days);
  }
}
