import { Injectable} from '@nestjs/common';
import { companyLevel, getInactiveUsersData, InactiveMonths, OrderData } from 'src/dtos/orderTrendDto';
import { PrismaService } from '../services/prisma.service';
import { NewUserfromdb } from 'src/dtos/orderTrendDto';




@Injectable()
export class DashboardRepo {
    constructor(private readonly prismaService : PrismaService){}

    async GetLastDays(days : number): Promise<OrderData[]>{
        return this.prismaService.$queryRaw `exec GetLastDays @noOfDays= ${days}`
    }
    async newuserdatafromdb(from:Date,to:Date):Promise<NewUserfromdb[]>{
        return this.prismaService.$queryRaw<NewUserfromdb[]>`exec GetNewRegistrations1 ${from},${to}`
    }
    async GetInactiveUsers(date : Date) : Promise<getInactiveUsersData[]>{
        return this.prismaService.$queryRaw `exec InactiveCompanies  ${date}`;
    }
    async GetInactiveMonths(days : number) : Promise<InactiveMonths[]>{
        return this.prismaService.$queryRaw `exec Inactivegraph ${days}`;
    }
    async getCompaniesList(){
        return this.prismaService.$queryRaw<string[]>`exec companies`;
    }
    async getSpecificCompanyData(companyString : String,dateString:String):Promise<companyLevel[]>{
        return this.prismaService.$queryRaw<companyLevel[]>`execute CompaniesSpecificData  ${companyString},${dateString}`;
    }

}


