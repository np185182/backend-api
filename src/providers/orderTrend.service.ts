import { Injectable } from '@nestjs/common';
import igeneralOrderservice from 'src/interfaces/igeneralOrderservice';
import { OrderData } from '../dtos/orderTrenddto';
import { PrismaService } from './prisma.service';

@Injectable()
export class OrderTrendService implements igeneralOrderservice {
  constructor(private prismautil: PrismaService) {}
  /**
   * Fetches OrderData from Database upto given number of days 
   * @param days It is an numeric type
   * @returns Json Array of OrderData DTO.
   */
  async getLastXDays(days : number) : Promise<OrderData[]>{
    return this.prismautil.$queryRaw `exec GetLastDays @noOfDays= ${days}`
  }
  
}
