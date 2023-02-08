import { Module } from '@nestjs/common';
import { OrdertrendService } from '../services/ordertrend.service';
import { OrdertrendResolver } from '../resolvers/dashboard.resolver';
import { PrismaService } from 'src/services/prisma.service';
import { DashboardRepo } from 'src/repositories/dashboard.repo';

@Module({
  providers: [OrdertrendResolver, OrdertrendService,PrismaService,DashboardRepo]
})
export class OrdertrendModule {}
