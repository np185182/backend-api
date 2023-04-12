import { Module } from '@nestjs/common';
import { OrderTrendService } from '../services/ordertrend.service';
import { OrderTrendResolver } from '../resolvers/ordertrend.resolver';
import { PrismaService } from 'src/services/prisma.service';
import { OrderTrendRepository } from 'src/repositories/ordertrend.repo';
import { OrderTrendController } from 'src/controllers/ordertrend.controller';

@Module({
  controllers: [OrderTrendController],
  providers: [
    OrderTrendResolver,
    OrderTrendService,
    PrismaService,
    OrderTrendRepository,
  ],
})
export class OrdertrendModule {}
