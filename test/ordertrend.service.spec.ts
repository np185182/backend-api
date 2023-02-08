import { Test, TestingModule } from '@nestjs/testing';
import { OrdertrendService } from '../src/services/ordertrend.service';

describe('OrdertrendService', () => {
  let service: OrdertrendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdertrendService],
    }).compile();

    service = module.get<OrdertrendService>(OrdertrendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
