import { Test, TestingModule } from '@nestjs/testing';
import { OrderTrendService } from '../src/services/ordertrend.service';

describe('OrdertrendService', () => {
  let service: OrderTrendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderTrendService],
    }).compile();

    service = module.get<OrderTrendService>(OrderTrendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
