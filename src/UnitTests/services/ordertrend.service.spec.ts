import { Test, TestingModule } from '@nestjs/testing';
import { DashboardRepo } from '../../repositories/dashboard.repo';
import { OrderTrendService } from '../../services/ordertrend.service';
import { PrismaService } from '../../services/prisma.service';
import { companyLevel, NewUser, NewUserfromdb, OrderData } from 'src/dtos/orderTrendDto';
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

  const expectedOut : Promise<companyLevel[]> = new Promise((resolve,reject)=>{

    const dummy : companyLevel[]=[
      {
        "TotalOrders": 0,
        "Date": "05-04-2020",
        "Company": "AO CAFE",
        "CompletedOrders": 0,
        "AttemptedOrders": 0
      },
      {
        "TotalOrders": 0,
        "Date": "05-05-2020",
        "Company": "AO CAFE",
        "CompletedOrders": 0,
        "AttemptedOrders": 0
      },
      {
        "TotalOrders": 0,
        "Date": "2021-06-07",
        "Company": "AO CAFE",
        "CompletedOrders": 0,
        "AttemptedOrders": 0
      },
      {
        "TotalOrders": 0,
        "Date": "05-04-2020",
        "Company": "Firehouse Subs",
        "CompletedOrders": 0,
        "AttemptedOrders": 0
      },
      {
        "TotalOrders": 0,
        "Date": "05-05-2020",
        "Company": "Firehouse Subs",
        "CompletedOrders": 0,
        "AttemptedOrders": 0
      },
      {
        "TotalOrders": 55157,
        "Date": "2021-06-07",
        "Company": "Firehouse Subs",
        "CompletedOrders": 39514,
        "AttemptedOrders": 15643
      },
      {
        "TotalOrders": 8,
        "Date": "05-04-2020",
        "Company": "The Spot",
        "CompletedOrders": 0,
        "AttemptedOrders": 8
      },
      {
        "TotalOrders": 40,
        "Date": "05-05-2020",
        "Company": "The Spot",
        "CompletedOrders": 5,
        "AttemptedOrders": 35
      },
      {
        "TotalOrders": 0,
        "Date": "2021-06-07",
        "Company": "The Spot",
        "CompletedOrders": 0,
        "AttemptedOrders": 0
      }];
      resolve(dummy);

  })

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
    newuserdatafromdb: jest.fn().mockReturnValue(outputfromdb),
    getSpecificCompanyData : jest.fn().mockReturnValue(expectedOut)

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

  it("check for companyOrder Trend service method", async () => {
    const companyString:string="AO CAFE,The Spot,Firehouse Subs";
    const dateString :string ="05-05-2020,05-04-2020,2021-06-07";
    const mockoutput = await service.getSpecificCompanydata(companyString,dateString)
    expect(mockoutput).toMatchObject(expectedOut);
  })


  describe('getLastXDays',()=>{
    const inputDays = 200;
    it('test the data obtained',async ()=>{
      const mockOutput = await service.getLastXDays(inputDays);
      expect(mockOutput).toBe(x);
    })
  })
});
