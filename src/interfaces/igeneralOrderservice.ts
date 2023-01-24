import { OrderData } from "../dtos/orderTrenddto";

export default interface igeneralOrderservice{
     getLastXDays(days : number) : Promise<OrderData[]>
}