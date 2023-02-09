import { Injectable} from '@nestjs/common';
import { OrderData } from '../dtos/orderTrendDto';
import { DashboardRepo } from 'src/repositories/dashboard.repo';

@Injectable()
export class OrderTrendService {
  constructor(private readonly dashboardRepo : DashboardRepo){}

  async getLastXDays(days : number) : Promise<OrderData[]> {
    return this.dashboardRepo.GetLastDays(days);
  }
}