import { Resolver,Query, Args, Int } from '@nestjs/graphql';
import { OrderTrendService } from '../services/ordertrend.service';
import { companiesList, CompanyData, companyLevel, getInactiveUsersData, NewUser, OrderData } from '../dtos/orderTrendDto';


@Resolver('Ordertrend')
export class OrdertrendResolver {
  constructor(private readonly ordertrendService: OrderTrendService) {}

  @Query(()=> [OrderData],{name: 'ordertrend'})
  getLastData(@Args('days', { type: () => Int }) days: number){
    return this.ordertrendService.getLastXDays(days);
  }
  @Query(()=>[NewUser],{name:"NewUsersData"})
  getUsersData(@Args('from',{type:()=>Date})from:Date,@Args('to',{type:()=>Date})to:Date){
   

    return this.ordertrendService.NewUsersdata(from,to);
  }

  @Query(()=> [getInactiveUsersData],{name: 'inactiveusers'})
  GetInactiveUsers(@Args('days', { type: () => Int }) days: number){
    return this.ordertrendService.InactiveUsers(days);
  }

  @Query(() => [companyLevel], { name: 'getSpecificCompanyData' }) getData(
    @Args('cname', { type: () => String}) cname: string,
    @Args('cdates', { type: () => String }) cdates: string,
  ) {
    return this.ordertrendService.getSpecificCompanydata(cname, cdates);
  }

  @Query(() => [companiesList], { name: 'companyLists' }) getCompanies()
 {
    return this.ordertrendService.getCompaniesList();
  }
}
