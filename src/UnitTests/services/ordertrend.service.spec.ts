import { Test, TestingModule } from '@nestjs/testing';
import { DashboardRepo } from '../../repositories/dashboard.repo';
import { OrderTrendService } from '../../services/ordertrend.service';
import { PrismaService } from '../../services/prisma.service';
import { NewUser, NewUserfromdb, OrderData } from 'src/dtos/orderTrendDto';
import { OrderTrendController } from 'src/controllers/ordertrend.controller';

describe('OrdertrendService', () => {
  let service: OrderTrendService;
  let repo: DashboardRepo;
  const outputfromdb: NewUserfromdb[] = [{
    "CompanyCreatedTimeStamp": "1/3/2022",
    "CompanyName":
      "Two Chefs Italian Restaurant & Bar"
    ,
    "frequency": 1
  }];
  const output: NewUser[] = [{
    companyCreatedTimeStamp: "1/3/2022",
    namesOfCompanies: [
      "Two Chefs Italian Restaurant & Bar"
    ],
    frequency: 1
  }];
  const x : OrderData[] = [
    {
      OrderDate : new Date("2022-09-02T00:00:00.000Z"),
      AttemptedOrders: 154796,
      CompletedOrders: 139538,
      TotalOrders: 294334
    },
    {
      OrderDate : new Date( "2022-09-03T00:00:00.000Z"),
      AttemptedOrders: 173167,
      CompletedOrders: 136527,
      TotalOrders: 309694
    },
    {
      OrderDate : new Date( "2022-09-04T00:00:00.000Z"),
      AttemptedOrders: 145245,
      CompletedOrders: 117504,
      TotalOrders: 262749
    },
    {
      OrderDate : new Date( "2022-09-05T00:00:00.000Z"),
      AttemptedOrders: 130253,
      CompletedOrders: 104960,
      TotalOrders: 235213
    },
    {
      OrderDate : new Date( "2022-09-06T00:00:00.000Z"),
      AttemptedOrders: 128425,
      CompletedOrders: 106207,
      TotalOrders: 234632
    },
    {
      OrderDate : new Date( "2022-09-07T00:00:00.000Z"),
      AttemptedOrders: 106961,
      CompletedOrders: 104315,
      TotalOrders: 211276
    }
  ];
  let mockrepo = {
    GetLastDays : jest.fn().mockReturnValue(x),
    newuserdatafromdb: jest.fn().mockReturnValue(outputfromdb)
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

      providers: [OrderTrendService,
        DashboardRepo, PrismaService],

    }).overrideProvider(DashboardRepo).useValue(mockrepo).compile();

    service = module.get<OrderTrendService>(OrderTrendService);
    repo = module.get<DashboardRepo>(DashboardRepo)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it("check for NewUserData service method", async () => {
    const mockoutput = await service.NewUsersdata(new Date('2022-01-01'), new Date('2022-01-03'))
    expect(mockoutput).toMatchObject(output);
  })
  describe('getLastXDays',()=>{
    const inputDays = 200;
    it('test the data obtained',async ()=>{
      const mockOutput = await service.getLastXDays(inputDays);
      expect(mockOutput).toBe(x);
    })
  })
});
