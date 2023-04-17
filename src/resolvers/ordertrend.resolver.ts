import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { OrderTrendService} from '../services/ordertrend.service';
import {
  Companies,
  CompanyOrders,
  InactiveCompanies,
  InactiveMonths,
  EnrolledCompanyList,
  OrderData,
} from '../dtos/orderTrendDto';

@Resolver('Ordertrend')
export class OrderTrendResolver {
  constructor(private readonly service: OrderTrendService) {}

  @Query(() => [OrderData], { name: 'getLastDays' })
  getLastDays(@Args('days', { type: () => Int }) days: number) {
    return this.service.getLastDays(days);
  }

  @Query(() => [CompanyOrders], { name: 'getSpecificCompanyData' }) getSpecificCompanydata(
    @Args('cname', { type: () => String }) cname: string,
    @Args('cdates', { type: () => String }) cdates: string,
  ) {
    return this.service.getSpecificCompanydata(cname, cdates);
  }

  @Query(() => [Companies], { name: 'getCompanyList' }) getCompaniesList() {
    return this.service.getCompaniesList();
  }

  @Query(() => [EnrolledCompanyList], { name: 'getCompaniesEnrolled' })
  getCompaniesEnrolled(
    @Args('from', { type: () => Date }) from: Date,
    @Args('to', { type: () => Date }) to: Date,
  ) {
    return this.service.getCompaniesEnrolled(from, to);
  }
  @Query(() => [InactiveCompanies], { name: 'getInactiveCompanies' })
  getInactiveUsers(@Args('date', { type: () => Date }) date: Date) {
    return this.service.getInactiveCompanies(date);
  }

  @Query(() => [InactiveMonths], { name: 'getInactiveMonths' })
  getInactiveMonths(@Args('days', { type: () => Int }) days: number) {
    return this.service.getInactiveMonths(days);
  }
}
