import { Controller, Get, Param,Query } from '@nestjs/common';
import { NewUser } from '../dtos/orderTrendDto';
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
  async getSpecificDaysOrdersData(@Param() params) {
    return this.orderTrendService.getLastXDays(params.days);
  }
  @Get()
async GetNewUsers(@Query('from')from:Date,@Query('to')to:Date):Promise<NewUser[]>{
  
  return await this.orderTrendService.NewUsersdata(from,to);
}

}