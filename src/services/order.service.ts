import { Injectable } from "@nestjs/common";   
import { PrismaService } from "./prisma.service";

@Injectable()
export class OrderService{

    constructor(private readonly prismaService:PrismaService){}
    
    async getLastXDays(days: number){
        return this.prismaService.$queryRaw `exec GetLastDays @noOfDays= ${days}`;
    }

    async getLastXDaysTest(data : {noOfDays:number,date:string}){
        return this.prismaService.$queryRaw `exec GetLastDaysTest @noOfDays= ${data.noOfDays},@givenDate=${data.date}`;
    }
}