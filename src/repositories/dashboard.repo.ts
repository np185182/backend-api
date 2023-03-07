import { Injectable} from '@nestjs/common';
import { getInactiveUsersData, OrderData } from '../dtos/orderTrendDto';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class DashboardRepo {
    constructor(private readonly prismaService : PrismaService){}

    async GetLastDays(days : number): Promise<OrderData[]>{
        return this.prismaService.$queryRaw `exec GetLastDays @noOfDays= ${days}`
    }

    async GetInactiveUsers(days : number) : Promise<getInactiveUsersData[]>{
        return this.prismaService.$queryRaw `exec InactiveDays @noOfDays= ${days}`;
      //   if (!Array.isArray(data)) {
      //     throw new Error('Data is not an array');
      //   }
      //   const convertedData = [
      //     {
      //         "CompanyName": data.map(company => {
      //           return company.CompanyName;
      //         })
      //     },
      //   ];
      //   return convertedData;
      // } 
    }
  }