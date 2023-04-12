import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { CompanyReqBody, NewUserList, OrderData} from '../dtos/orderTrendDto';
import { OrderTrendService } from '../services/ordertrend.service';

@Controller('OrderTrends')
export class OrderTrendController {
  constructor(private readonly service: OrderTrendService) {}
  /**
   * Fetches OrderData from Database upto given number of days
   * @param params params consists days which is an numberic type
   * @returns Json Array of OrderData DTO
   */
  @Get('/days/:days')
  async getLastDays(@Param() params): Promise<OrderData[]> {
    const data = await this.service.getLastDays(params.days);
    return data;
  }

  @Get('/CompanyData/')
  async getSpecificCompanyData(@Body() body: CompanyReqBody) {
    return this.service.getSpecificCompanydata(
      body.companyString,
      body.dateString,
    );
  }

  @Get('/companies/')
  async getAllCompanies() {
    return this.service.getCompaniesList();
  }

  @Get()
  async getCompaniesEnrolled(
    @Query('from') from: Date,
    @Query('to') to: Date,
  ): Promise<NewUserList[]> {
    return this.service.getCompaniesEnrolled(from, to);
  }

  @Get('/InactiveUsers/:date')
  async getInactiveCompanies(@Param() params) {
    return this.service.getInactiveCompanies(params.date);
  }
  
  @Get('/InactiveMonths/')
  async getInactiveMonths(@Param() params) {
    return this.service.getInactiveMonths(params.days);
  }
}
