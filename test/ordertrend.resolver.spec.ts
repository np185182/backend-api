import { Test, TestingModule } from '@nestjs/testing';
import { OrdertrendResolver } from '../src/resolvers/dashboard.resolver';
import { OrderTrendService } from '../src/services/ordertrend.service';

describe('OrdertrendResolver', () => {
  let resolver: OrdertrendResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdertrendResolver, OrderTrendService],
    }).compile();

    resolver = module.get<OrdertrendResolver>(OrdertrendResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
