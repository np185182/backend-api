import { Module } from '@nestjs/common';
import { OrderTrendService } from '../services/ordertrend.service';
import { OrdertrendResolver } from '../resolvers/dashboard.resolver';
import { PrismaService } from 'src/services/prisma.service';
import { DashboardRepo } from 'src/repositories/dashboard.repo';
import { OrderTrendController } from 'src/controllers/ordertrend.controller';

@Module({
  controllers: [OrderTrendController],
  providers: [
    OrdertrendResolver,
    OrderTrendService,
    PrismaService,
    DashboardRepo,
  ],
})
export class OrdertrendModule {}
