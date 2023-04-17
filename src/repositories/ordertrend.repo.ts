import { Injectable } from '@nestjs/common';
import {
  CompanyOrders,
  EnrolledCompany,
  InactiveCompanies,
  InactiveMonths,
  OrderData,
} from 'src/dtos/orderTrendDto';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class OrderTrendRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getLastDays(days: number): Promise<OrderData[]> {
    return this.prismaService.$queryRaw`exec GetLastDays @noOfDays= ${days}`;
  }

  async getCompaniesList() {
    return this.prismaService.$queryRaw<string[]>`exec companies`;
  }

  async getSpecificCompanydata(
    companyString: String,
    dateString: String,
  ): Promise<CompanyOrders[]> {
    return this.prismaService.$queryRaw<
      CompanyOrders[]
    >`execute CompaniesSpecificData  ${companyString},${dateString}`;
  }

  async getCompaniesEnrolled(from: Date, to: Date): Promise<EnrolledCompany[]> {
    return this.prismaService.$queryRaw<
      EnrolledCompany[]
    >`exec GetCompaniesEnrolled ${from},${to}`;
  }

  async getInactiveCompanies(date: Date): Promise<InactiveCompanies[]> {
    return this.prismaService.$queryRaw`exec InactiveCompanies  ${date}`;
  }

  async getInactiveMonths(days: number): Promise<InactiveMonths[]> {
    return this.prismaService.$queryRaw`exec InactiveGraph ${days}`;
  }
}
