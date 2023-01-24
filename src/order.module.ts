import { Module } from '@nestjs/common';
import { OrderTrendController } from './controllers/OrderTrend.controller';
import { PrismaService } from './providers/prisma.service';
import { OrderTrendService } from './providers/orderTrend.service';

@Module({
  imports: [],
  controllers: [OrderTrendController],
  providers: [OrderTrendService,PrismaService],
})
export class AppModule {}
