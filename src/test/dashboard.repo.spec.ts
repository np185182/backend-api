import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../services/prisma.service';
import { getInactiveUsersData } from '../dtos/orderTrendDto';
import { OrderTrendService } from '../services/ordertrend.service';
import { DashboardRepo } from '../repositories/dashboard.repo';

describe('OrdertrendService', () => {
  let repo: DashboardRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderTrendService,PrismaService,DashboardRepo],
    }).compile();

    repo = module.get<DashboardRepo>(DashboardRepo);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('InactiveUsers', () => {
    it('should return inactive users data for the last X days', async () => {
      const result:getInactiveUsersData[]=[{CompanyName:[""]}];
      const Output:Promise<getInactiveUsersData[]> = new Promise((resolve,reject)=>{
        
        resolve(result);
      }
      )
      jest.spyOn(repo, 'GetInactiveUsers').mockImplementation(() => Output);
      const x=await repo.GetInactiveUsers(30)
      console.log(x);
      expect(x).toStrictEqual(result);
    });
  });
});
