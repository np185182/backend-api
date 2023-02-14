import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../services/prisma.service';
import { getInactiveUsersData } from '../dtos/orderTrendDto';
import { OrderTrendService } from '../services/ordertrend.service';
import { DashboardRepo } from '../repositories/dashboard.repo';

describe('OrdertrendService', () => {
  let service: OrderTrendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderTrendService,PrismaService,DashboardRepo],
    }).compile();

    service = module.get<OrderTrendService>(OrderTrendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('InactiveUsers', () => {
    it('should return inactive users data for the last X days', async () => {
      const result:getInactiveUsersData[]=[{CompanyName:[""]}];
      const Output:Promise<getInactiveUsersData[]> = new Promise((resolve,reject)=>{
        
        resolve(result);
      }
      )
      jest.spyOn(service, 'InactiveUsers').mockImplementation(() => Output);
      const x=await service.InactiveUsers(30)
      console.log(x);
      expect(x).toStrictEqual(result);
    });
  });
});
