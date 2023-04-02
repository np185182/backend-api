import { Injectable } from '@nestjs/common';
import {
  companyLevel,
  getInactiveUsersData,
  InactiveMonths,
  OrderData,
} from '../dtos/orderTrendDto';
import { DashboardRepo } from '../repositories/dashboard.repo';
import { NewUserfromdb } from '../dtos/orderTrendDto';
import { NewUser } from '../dtos/orderTrendDto';

@Injectable()
export class OrderTrendService {
  constructor(private readonly dashboardRepo: DashboardRepo) {}

  async getLastXDays(days: number): Promise<OrderData[]> {
    const data = await this.dashboardRepo.GetLastDays(days);
    return data;
  }

  async getSpecificCompanydata(
    customerName: String,
    dates: String,
  ): Promise<companyLevel[]> {
    return this.dashboardRepo.getSpecificCompanyData(customerName, dates);
  }
  async getCompaniesList(): Promise<string[]> {
    return this.dashboardRepo.getCompaniesList();
  }

  async NewUsersdata(fromdate: Date, todate: Date): Promise<NewUser[]> {
    const datafromDb: NewUserfromdb[] =
      await this.dashboardRepo.newuserdatafromdb(fromdate, todate);

    const map = new Map<string, string[]>();

    datafromDb.forEach((obj) => {
      if (map.has(obj.CompanyCreatedTimeStamp)) {
        const temp = map.get(obj.CompanyCreatedTimeStamp);
        temp.push(obj.CompanyName);
        map[obj.CompanyCreatedTimeStamp] = temp;
      } else {
        map.set(obj.CompanyCreatedTimeStamp, [obj.CompanyName]);
      }
    });

    const newUserdata: NewUser[] = [];

    map.forEach((val, key) => {
      newUserdata.push({
        companyCreatedTimeStamp: key,
        namesOfCompanies: val,
        frequency: val.length,
      });
    });

    return newUserdata;
  }
  async InactiveUsers(date: Date): Promise<getInactiveUsersData[]> {
    return this.dashboardRepo.GetInactiveUsers(date);
  }
  async GetInactiveMonths(days: number) : Promise<InactiveMonths[]>{
    return this.dashboardRepo.GetInactiveMonths(days);
}
}
