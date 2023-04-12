import { Injectable } from '@nestjs/common';
import {
  CompanyOrders,
  InactiveCompanies,
  InactiveMonths,
  NewUser,
  NewUserList,
  OrderData,
} from '../dtos/orderTrendDto';
import { OrderTrendRepository } from '../repositories/ordertrend.repo';

@Injectable()
export class OrderTrendService {
  constructor(private readonly repository: OrderTrendRepository) {}

  async getLastDays(days: number): Promise<OrderData[]> {
    const data = await this.repository.getLastDays(days);
    return data;
  }

  async getSpecificCompanydata(
    CompanyString: String,
    dateString: String,
  ): Promise<CompanyOrders[]> {
    return this.repository.getSpecificCompanydata(CompanyString, dateString);
  }

  async getCompaniesList(): Promise<string[]> {
    return this.repository.getCompaniesList();
  }

  async getCompaniesEnrolled(fromdate: Date, todate: Date): Promise<NewUserList[]> {
    const datafromDb: NewUser[] =
      await this.repository.getCompaniesEnrolled(fromdate, todate);
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
    const newUserdata: NewUserList[] = [];
    map.forEach((val, key) => {
      newUserdata.push({
        companyCreatedTimeStamp: key,
        namesOfCompanies: val,
        frequency: val.length,
      });
    });
    return newUserdata;
  }

  async getInactiveCompanies(date: Date): Promise<InactiveCompanies[]> {
    return this.repository.getInactiveCompanies(date);
  }

  async getInactiveMonths(days: number): Promise<InactiveMonths[]> {
    return this.repository.getInactiveMonths(days);
  }
}
