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
export class NewUser{
    @Field()
    companyCreatedTimeStamp:string;
    @Field(type=>[String])
    namesOfCompanies?:string[];
    @Field()
    frequency:number;
}
@ObjectType()
export class NewUserfromdb{
    @Field()
    frequency: number;
    @Field()
    CompanyCreatedTimeStamp: string;
    @Field()
    CompanyName: string; 
}

