import { Test, TestingModule } from '@nestjs/testing';
import { DashboardRepo } from '../../repositories/dashboard.repo';
import { OrderTrendService } from '../../services/ordertrend.service';
import { PrismaService } from '../../services/prisma.service';
import { NewUser } from 'src/dtos/orderTrendDto';
import { OrderTrendController } from 'src/controllers/ordertrend.controller';

describe('OrdertrendService', () => {
  let service: OrderTrendService;
  
const output:NewUser[]=[];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      
      providers: [OrderTrendService,
      DashboardRepo,PrismaService],
      
    }).compile();

    service = module.get<OrderTrendService>(OrderTrendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it("check for NewUserData service method",()=>{
service.NewUsersdata=jest.fn().mockReturnValue(output)
expect(service.NewUsersdata(new Date('2022-01-01'),new Date('2022-01-03'))).toBe(output)

  })
  
});
