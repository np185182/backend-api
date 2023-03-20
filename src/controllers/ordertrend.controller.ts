import { Body, Controller, Get, Param,Query } from '@nestjs/common';
import { NewUser, OrderData, reqbody } from '../dtos/orderTrendDto';
import { OrderTrendService } from '../services/ordertrend.service';


@Controller('OrderTrends')
export class OrderTrendController {
  constructor(private readonly orderTrendService : OrderTrendService){}
    /**
   * Fetches OrderData from Database upto given number of days 
   * @param params params consists days which is an numberic type
   * @returns Json Array of OrderData DTO
   */
  @Get('/days/:days')
  async getSpecificDaysOrdersData(@Param() params) : Promise<OrderData[]> {
    const data = await this.orderTrendService.getLastXDays(params.days)
    return data;
  }

  @Get()
  async GetNewUsers(@Query('from')from:Date,@Query('to')to:Date):Promise<NewUser[]>{
    return this.orderTrendService.NewUsersdata(from,to);
  }

  @Get('/InactiveUsers/:days')
  async getInactiveUsersData(@Param() params) {
    return this.orderTrendService.InactiveUsers(params.days);
  }
  @Get('/CompanyData/')
  async getSpecificCompanyData(@Body() body:reqbody){
    return this.orderTrendService.getSpecificCompanydata(body.companyString,body.dateString)
  }
  @Get('/companies/')
  async getAllCompanies(){
    return this.orderTrendService.getCompaniesList();
  } 

}