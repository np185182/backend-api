import { Injectable} from '@nestjs/common';
import { getInactiveUsersData, OrderData } from 'src/dtos/orderTrendDto';
import { PrismaService } from '../services/prisma.service';
import { NewUserfromdb } from 'src/dtos/orderTrendDto';

@Injectable()
export class DashboardRepo {
    constructor(private readonly prismaService : PrismaService){}

    async GetLastDays(days : number): Promise<OrderData[]>{
        return this.prismaService.$queryRaw `exec GetLastDays @noOfDays= ${days}`
    }
    async newuserdatafromdb(from:Date,to:Date):Promise<NewUserfromdb[]>{
        return this.prismaService.$queryRaw<NewUserfromdb[]>`exec GetNewRegistrations ${from},${to}`
    }
    async GetInactiveUsers(days : number) : Promise<getInactiveUsersData[]>{
        return this.prismaService.$queryRaw `exec InactiveDays @noOfDays= ${days}`;
    }
}