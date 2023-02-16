import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class OrderData {
    @Field()
    OrderDate : Date;

    @Field()
    AttemptedOrders : Number;

    @Field()
    CompletedOrders : Number;

    @Field()
    TotalOrders : Number;
}

@ObjectType()
export class getInactiveUsersData {
    @Field(type => [String], { nullable: true })
    CompanyName? : string[];
}

