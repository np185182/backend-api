import { Injectable} from '@nestjs/common';
import { getInactiveUsersData, OrderData } from '../dtos/orderTrendDto';
import { DashboardRepo } from '../repositories/dashboard.repo';

@Injectable()
export class OrderTrendService {
  constructor(private readonly dashboardRepo : DashboardRepo){}

  async getLastXDays(days : number) : Promise<OrderData[]> {
    return this.dashboardRepo.GetLastDays(days);
  }
  async InactiveUsers(days : number) : Promise<getInactiveUsersData[]> {
    return this.dashboardRepo.GetInactiveUsers(days);
  }
}