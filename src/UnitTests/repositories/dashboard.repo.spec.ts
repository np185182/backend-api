import { Test, TestingModule } from "@nestjs/testing";
import { OrderTrendController } from '../../controllers/ordertrend.controller'
import { DashboardRepo } from "../../repositories/dashboard.repo";
import { OrderTrendService } from "../../services/ordertrend.service";
import { PrismaService } from "../../services/prisma.service";
import { companyLevel, getInactiveUsersData, NewUserfromdb, OrderData } from "../../dtos/orderTrendDto";
import { resolve } from "path";
import { rejects } from "assert";

describe('OrderTrendsController', () => {

  let repo: DashboardRepo;

  const intermediateoutput: Promise<NewUserfromdb[]> = new Promise((resolve, reject) => {
    const kinter: NewUserfromdb[] = [{
      "frequency": 0,
      "CompanyCreatedTimeStamp": "0",
      "CompanyName":
        "0"
    },];
    resolve(kinter)
  })

  const FinalOut: Promise<getInactiveUsersData[]> = new Promise((resolve, reject) => {
    const fout: getInactiveUsersData[] = [
      {
        "CompanyName": "Jimmy Changas",
        "LatestOrderDate": new Date("2021-07-23T00:00:00.000Z")
      },
      {
        "CompanyName": "Zlantest2",
        "LatestOrderDate": new Date("2021-04-08T00:00:00.000Z")
      },
      {
        "CompanyName": "RC Test Company",
        "LatestOrderDate": new Date("2021-06-25T00:00:00.000Z")
      },
      {
        "CompanyName": "Balboa Cafe",
        "LatestOrderDate": new Date("2021-08-06T00:00:00.000Z")
      },
      {
        "CompanyName": "radianttest",
        "LatestOrderDate": new Date("2021-04-08T00:00:00.000Z")
      },
      {
        "CompanyName": "AO CAFE",
        "LatestOrderDate": new Date("2021-09-17T00:00:00.000Z")
      },
      {
        "CompanyName": "Jun",
        "LatestOrderDate": new Date("2021-08-25T00:00:00.000Z")
      },
      {
        "CompanyName": "jun",
        "LatestOrderDate": new Date("2021-08-25T00:00:00.000Z")
      },
      {
        "CompanyName": "migtest",
        "LatestOrderDate": new Date("2021-08-06T00:00:00.000Z")
      },
      {
        "CompanyName": "Gold Standard Import Test Company",
        "LatestOrderDate": new Date("2021-07-16T00:00:00.000Z")
      }
    ];
    resolve(fout)
  })

  const fOutput: Promise<OrderData[]> = new Promise((resolve, reject) => {
    const dummy: OrderData[] =
      [{
        "OrderDate": new Date("2022-09-02T00:00:00.000Z"),
        "AttemptedOrders": 154796,
        "CompletedOrders": 139538,
        "TotalOrders": 294334
      },
      {
        "OrderDate": new Date("2022-09-03T00:00:00.000Z"),
        "AttemptedOrders": 173167,
        "CompletedOrders": 136527,
        "TotalOrders": 309694
      }
        , {
        "OrderDate": new Date("2022-09-04T00:00:00.000Z"),
        "AttemptedOrders": 145245,
        "CompletedOrders": 117504,
        "TotalOrders": 262749
      }
        , {
          "OrderDate": new Date("2022-09-05T00:00:00.000Z"),
        "AttemptedOrders": 130253,
        "CompletedOrders": 104960,
        "TotalOrders": 235213
      },
      {
        "OrderDate": new Date("2022-09-06T00:00:00.000Z"),
        "AttemptedOrders": 128425,
        "CompletedOrders": 106207,
        "TotalOrders": 234632
      },
      {
        "OrderDate": new Date("2022-09-07T00:00:00.000Z"),
        "AttemptedOrders": 106961,
        "CompletedOrders": 104315,
        "TotalOrders": 211276
      }];
    resolve(dummy);
  })


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

  const Mockprismaservice = {

  }


  beforeEach(async () => {

    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderTrendController],
      providers: [OrderTrendService, DashboardRepo, PrismaService],
    }).overrideProvider(PrismaService).useValue(Mockprismaservice).compile();
    repo = app.get<DashboardRepo>(DashboardRepo);

  });
  it("DashboardRepository should be defined", () => {
    expect(repo).toBeDefined();
  })
  it("GetNewUsermethod checking from repository", () => {
    const mockfromdate = new Date("2022-01-01");
    const mocktodate = new Date("2022-01-02");
    repo.newuserdatafromdb = jest.fn().mockReturnValue(intermediateoutput)
    const repooutput = repo.newuserdatafromdb(mockfromdate, mocktodate)
    expect(repooutput).toMatchObject(intermediateoutput)
  })
  it("GetLastDays checking from repository", () => {
    const mockDays = 200;
    repo.GetLastDays = jest.fn().mockReturnValue(fOutput);
    const repooutput = repo.GetLastDays(mockDays);
    expect(repooutput).toMatchObject(fOutput);
  })
  it("Get Specific Company Data checking from repository", () => {
       const companyString:string="AO CAFE,The Spot,Firehouse Subs";
       const dateString :string ="05-05-2020,05-04-2020,2021-06-07";
       repo.getSpecificCompanyData= jest.fn().mockReturnValue(expectedOut)
       const repoOutput = repo.getSpecificCompanyData(companyString,dateString);
       expect(repoOutput).toMatchObject(expectedOut);
  })
})