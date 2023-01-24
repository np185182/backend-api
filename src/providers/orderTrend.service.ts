import { Injectable } from '@nestjs/common/decorators';
import igeneralOrderservice from 'src/interfaces/igeneralOrderservice';
import { OrderData } from '../dtos/orderTrenddto';
import { PrismaService } from './prisma.service';

@Injectable()
export class OrderTrendService implements igeneralOrderservice {
  constructor(private prismautil: PrismaService) {}

  async getLastXDays(days : number) : Promise<OrderData[]>{
    return this.prismautil.$queryRaw `exec GetLastDays @noOfDays= ${days}`
  }
  
}
