import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderTrendService } from '../services/ordertrend.service';
import { getInactiveUsersData, OrderData } from '../dtos/orderTrendDto';

@Resolver('Ordertrend')
export class OrdertrendResolver {
  constructor(private readonly ordertrendService: OrderTrendService) {}

  @Query(()=> [OrderData],{name: 'ordertrend'})
  getLastData(@Args('days', { type: () => Int }) days: number){
    return this.ordertrendService.getLastXDays(days);
  }

  @Query(()=> [getInactiveUsersData],{name: 'inactiveusers'})
  GetInactiveUsers(@Args('days', { type: () => Int }) days: number){
    return this.ordertrendService.InactiveUsers(days);
  }
  
}
