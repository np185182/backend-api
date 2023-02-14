import { Controller, Get, Param } from '@nestjs/common';
import { OrderData } from '../dtos/orderTrendDto';
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

  @Get('/InactiveUsers/:days')
  async getInactiveUsersData(@Param() params) {
    return this.orderTrendService.InactiveUsers(params.days);
  }
}