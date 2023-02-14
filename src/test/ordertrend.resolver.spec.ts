import { Test, TestingModule } from '@nestjs/testing';
import { printSchema } from 'graphql';
import { PrismaService } from '../services/prisma.service';
import { OrdertrendResolver } from '../resolvers/dashboard.resolver';
import { OrderTrendService } from '../services/ordertrend.service';
import { DashboardRepo } from '../repositories/dashboard.repo';

describe('OrdertrendResolver', () => {
  let resolver: OrdertrendResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdertrendResolver, OrderTrendService, PrismaService, DashboardRepo],
    }).compile();

    resolver = module.get<OrdertrendResolver>(OrdertrendResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  
});
