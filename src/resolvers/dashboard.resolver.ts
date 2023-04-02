import { Resolver,Query, Args, Int } from '@nestjs/graphql';
import { OrderTrendService } from '../services/ordertrend.service';
import { companiesList, CompanyData, companyLevel, getInactiveUsersData, InactiveMonths, NewUser, OrderData } from '../dtos/orderTrendDto';


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
  GetInactiveUsers(@Args('date', { type: () => Date }) date: Date){
    return this.ordertrendService.InactiveUsers(date);
  }
  @Query(()=> [InactiveMonths],{name: 'inactivemonths'})
  GetInactiveMonths(@Args('days', { type: ()=> Int}) days:number){
    return this.ordertrendService.GetInactiveMonths(days);
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
