import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { OrdertrendModule } from './ordertrend.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    OrdertrendModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
