import { Test, TestingModule } from '@nestjs/testing';
import { DashboardRepo } from '../repositories/dashboard.repo';
import { OrderTrendController } from '../controllers/ordertrend.controller';
import { getInactiveUsersData } from '../dtos/orderTrendDto';
import { OrderTrendService } from '../services/ordertrend.service';
import { PrismaService } from '../services/prisma.service';


describe('OrderTrendController', () => {
  let orderTrendController: OrderTrendController;
  let orderTrendService: OrderTrendService;
  const mockcontroller={

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderTrendController],
      providers: [
        OrderTrendService,DashboardRepo,PrismaService],
    }).compile();

    orderTrendController = module.get<OrderTrendController>(OrderTrendController);
    orderTrendService = module.get<OrderTrendService>(OrderTrendService);
  });


  it('should be defined', () => {
    expect(orderTrendController).toBeDefined();
  });
  

  describe('getInactiveUsersData', () => {
    it('should return inactive users data for the last X days', async () => {
      const result:getInactiveUsersData[]=[{CompanyName:[""]}];
      const Output:Promise<getInactiveUsersData[]> = new Promise((resolve,reject)=>{
        
        resolve(result);
      }
      )
      jest.spyOn(orderTrendController, 'getInactiveUsersData').mockImplementation(() => Output);
      const x=await orderTrendController.getInactiveUsersData({ days: 30 })
      console.log(x);
      expect(x).toStrictEqual(result);
    });
  });
});
