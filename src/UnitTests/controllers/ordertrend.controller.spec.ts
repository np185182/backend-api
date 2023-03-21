import { Test, TestingModule } from "@nestjs/testing";
import { OrderTrendController } from '../../controllers/ordertrend.controller'
import { DashboardRepo } from "../../repositories/dashboard.repo";
import { OrderTrendService } from "../../services/ordertrend.service";
import { PrismaService } from "../../services/prisma.service";
import { NewUser, OrderData } from "../../dtos/orderTrendDto";

describe('OrderTrendsController', () => {
    let Controller: OrderTrendController;
    let service: OrderTrendService;
    const finaloutput: Promise<NewUser[]> = new Promise((resolve, reject) => {
        const kfinal: NewUser[] = [{
            "companyCreatedTimeStamp": "2022-01-03",
            "namesOfCompanies": [
                "Two Chefs Italian Restaurant & Bar"
            ],
            "frequency": 1
        },];
        resolve(kfinal)
    })
    


    const fOutput : Promise<OrderData[]> = new Promise((resolve,reject)=>{
        const dummy : OrderData[] = [{ "OrderDate": "2022-09-02T00:00:00.000Z", "AttemptedOrders": 154796, "CompletedOrders": 139538, "TotalOrders": 294334 }, { "OrderDate": "2022-09-03T00:00:00.000Z", "AttemptedOrders": 173167, "CompletedOrders": 136527, "TotalOrders": 309694 }, { "OrderDate": "2022-09-04T00:00:00.000Z", "AttemptedOrders": 145245, "CompletedOrders": 117504, "TotalOrders": 262749 }, { "OrderDate": "2022-09-05T00:00:00.000Z", "AttemptedOrders": 130253, "CompletedOrders": 104960, "TotalOrders": 235213 }, { "OrderDate": "2022-09-06T00:00:00.000Z", "AttemptedOrders": 128425, "CompletedOrders": 106207, "TotalOrders": 234632 }, { "OrderDate": "2022-09-07T00:00:00.000Z", "AttemptedOrders": 106961, "CompletedOrders": 104315, "TotalOrders": 211276 }];
        resolve(dummy);
    })

    let mockservice = {
        NewUsersdata: jest.fn().mockReturnValue(finaloutput),
        getLastXDays : jest.fn().mockReturnValue(fOutput)
    }


    beforeEach(async () => {

        const app: TestingModule = await Test.createTestingModule({
            controllers: [OrderTrendController],
            providers: [OrderTrendService, DashboardRepo, PrismaService],
        }).overrideProvider(OrderTrendService).useValue(mockservice).compile();

        Controller = app.get<OrderTrendController>(OrderTrendController);
        service = app.get<OrderTrendService>(OrderTrendService)
    });
    it("OrderTrendsController", () => {
        expect(Controller).toBeDefined();
    })
    it("Should return the newUsers Data From Service", () => {
        const mockfromdate = new Date("2022-01-01");
        const mocktodate = new Date("2022-01-02");
        expect(Controller.GetNewUsers(mockfromdate, mocktodate)).toMatchObject(finaloutput);
    })

    it('should return data from service',async() => {
        const mockDays = 200;
        expect(service.getLastXDays(mockDays)).toMatchObject(fOutput);
    })
})