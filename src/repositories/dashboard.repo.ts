import { Injectable} from '@nestjs/common';
import { OrderData } from 'src/dtos/orderTrendDto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class DashboardRepo {
    constructor(private readonly prismaService : PrismaService){}

    async GetLastDays(days : number): Promise<OrderData[]>{
        return this.prismaService.$queryRaw `exec GetLastDays @noOfDays= ${days}`
    }
}