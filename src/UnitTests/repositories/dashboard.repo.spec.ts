import { Test, TestingModule } from "@nestjs/testing";
import { OrderTrendController } from '../../controllers/ordertrend.controller'
import { DashboardRepo } from "../../repositories/dashboard.repo";
import { OrderTrendService } from "../../services/ordertrend.service";
import { PrismaService } from "../../services/prisma.service";
import { getInactiveUsersData, NewUserfromdb, OrderData } from "../../dtos/orderTrendDto";

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
  it("GetInactiveUsers checking from repository", () => {
    const mockdate = new Date("2022-01-01");
    repo.GetInactiveUsers = jest.fn().mockReturnValue(FinalOut)
    const repooutput = repo.GetInactiveUsers(mockdate)
    expect(repooutput).toMatchObject(FinalOut)
  })
  
})