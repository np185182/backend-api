import { Test, TestingModule } from '@nestjs/testing';
import { DashboardRepo } from '../../repositories/dashboard.repo';
import { OrderTrendService } from '../../services/ordertrend.service';
import { PrismaService } from '../../services/prisma.service';
import { NewUser, NewUserfromdb } from 'src/dtos/orderTrendDto';
import { OrderTrendController } from 'src/controllers/ordertrend.controller';

describe('OrdertrendService', () => {
  let service: OrderTrendService;
  let repo:DashboardRepo;
  const outputfromdb:NewUserfromdb[]=[{
    "CompanyCreatedTimeStamp": "1/3/2022",
    "CompanyName": 
        "Two Chefs Italian Restaurant & Bar"
    ,
    "frequency": 1
}];
  const output:NewUser[]=[{
    companyCreatedTimeStamp: "1/3/2022",
    namesOfCompanies: [
        "Two Chefs Italian Restaurant & Bar"
    ],
    frequency: 1
}];
  let mockrepo={
newuserdatafromdb:jest.fn().mockReturnValue(outputfromdb)
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      
      providers: [OrderTrendService,
      DashboardRepo,PrismaService],
      
    }).overrideProvider(DashboardRepo).useValue(mockrepo).compile();

    service = module.get<OrderTrendService>(OrderTrendService);
    repo=module.get<DashboardRepo>(DashboardRepo)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it("check for NewUserData service method",async ()=>{


const mockoutput=await service.NewUsersdata(new Date('2022-01-01'),new Date('2022-01-03'))



expect(mockoutput).toMatchObject(output)

  })
  
});
