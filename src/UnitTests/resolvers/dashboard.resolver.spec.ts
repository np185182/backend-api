import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../services/prisma.service';
import { DashboardRepo } from '../../repositories/ordertrend.repo';
import { OrdertrendResolver } from '../../resolvers/ordertrend.resolver';
import { OrderTrendService } from '../../services/ordertrend.service';

describe('OrdertrendResolver', () => {
  let resolver: OrdertrendResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdertrendResolver, OrderTrendService,DashboardRepo,PrismaService],
    }).compile();

    resolver = module.get<OrdertrendResolver>(OrdertrendResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
