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

@ObjectType()
export class CompanyData{
    @Field()
    frequency: number;
    @Field()
    CompanyName: string;
    @Field()
    Date: Date; 
}

@ObjectType()
export class getInactiveUsersData {
    @Field(type=>String,{nullable:true})
    CompanyName : String;

    @Field({nullable:true})
    LatestOrderDate : Date;
}

@ObjectType()
export class companyLevel {
  @Field()
  Company: string;
  @Field()
  Date: String;
  @Field()
  TotalOrders: number;
  @Field()
  AttemptedOrders: number;
  @Field()
  CompletedOrders: number;
}

export type reqbody ={
  companyString:String,
  dateString:String
}
@ObjectType()
export class companiesList{
  @Field({nullable:true})
  CompanyName:String

}


