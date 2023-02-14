import { Test,TestingModule } from "@nestjs/testing";
import { OrderTrendController } from '../../controllers/ordertrend.controller'
import { DashboardRepo}  from "../../repositories/dashboard.repo";
import { OrderTrendService } from "../../services/ordertrend.service";
import { PrismaService } from "../../services/prisma.service";
import { NewUserfromdb } from "../../dtos/orderTrendDto";

describe('OrderTrendsController',()=>{
    
    let repo:DashboardRepo;
   
    const intermediateoutput:Promise<NewUserfromdb[]>=new Promise((resolve,reject)=>{
      const kinter:NewUserfromdb[]=[{
        "frequency": 0,
        "CompanyCreatedTimeStamp": "0",
        "CompanyName": 
            "0"},];
    resolve(kinter)})
    const Mockprismaservice={

    }
        
      
    beforeEach(async () => {
        
        const app: TestingModule = await Test.createTestingModule({
          controllers: [OrderTrendController],
          providers: [OrderTrendService,DashboardRepo,PrismaService],
          }).overrideProvider(PrismaService).useValue(Mockprismaservice).compile();
          
          
          repo=app.get<DashboardRepo>(DashboardRepo);
        });
        it("DashboardRepository should be defined",()=>{
            expect(repo).toBeDefined();
        })
        it("GetNewUsermethod checking from repository",()=>{
            const mockfromdate=new Date("2022-01-01");
            const mocktodate=new Date("2022-01-02");
            repo.newuserdatafromdb=jest.fn().mockReturnValue(intermediateoutput)
            const repooutput=repo.newuserdatafromdb(mockfromdate,mocktodate)
            expect(repooutput).toMatchObject(intermediateoutput)
          
           
        })
        
})