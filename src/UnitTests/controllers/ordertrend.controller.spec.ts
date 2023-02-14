import { Test,TestingModule } from "@nestjs/testing";
import { OrderTrendController } from '../../controllers/ordertrend.controller'
import { DashboardRepo } from "../../repositories/dashboard.repo";
import { OrderTrendService } from "../../services/ordertrend.service";
import { PrismaService } from "../../services/prisma.service";
import {  NewUser } from "../../dtos/orderTrendDto";

describe('OrderTrendsController',()=>{
    let Controller:OrderTrendController;
    let service:OrderTrendService;
    const finaloutput:Promise<NewUser[]>=new Promise((resolve,reject)=>{
        const kfinal:NewUser[]=[{
          "companyCreatedTimeStamp": "2022-01-03",
          "namesOfCompanies": [
              "Two Chefs Italian Restaurant & Bar"
          ],
          "frequency": 1
      },];
      resolve(kfinal)
      })
    let mockservice={
        NewUsersdata:jest.fn().mockReturnValue(finaloutput) 
    }
   
      
      
    beforeEach(async () => {
        
        const app: TestingModule = await Test.createTestingModule({
          controllers: [OrderTrendController],
          providers: [OrderTrendService,DashboardRepo,PrismaService],
          }).overrideProvider(OrderTrendService).useValue(mockservice).compile();
          
          Controller = app.get<OrderTrendController>(OrderTrendController);
          service=app.get<OrderTrendService>(OrderTrendService)
         
        });
        it("OrderTrendsController",()=>{
            expect(Controller).toBeDefined();
        })
        it("GetNewUsermethod checking",()=>{
            const mockfromdate=new Date("2022-01-01");
            const mocktodate=new Date("2022-01-02");
            
            
            expect(Controller.GetNewUsers(mockfromdate,mocktodate)).toMatchObject(finaloutput);
           
           
        })
        
})