import { DocumentNode, gql } from "@apollo/client"

export default function AllQueries(){
    let newUserQuery=gql`query GetNewUsers($Fromdate:DateTime!,$Todate:DateTime!){
        NewUsersData(from:$Fromdate,to:$Todate){
          companyCreatedTimeStamp
          namesOfCompanies
          frequency
        }} `
        const FILMS_QUERY = gql`
        query HelloGetData($input : Int!){
          ordertrend(days : $input){
            OrderDate
            AttemptedOrders
            CompletedOrders
            TotalOrders
          }
        }
        `; 
    return [newUserQuery,FILMS_QUERY]        

}

    

  
