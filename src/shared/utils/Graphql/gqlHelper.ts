import { useQuery } from "@apollo/client";
import { NewUsersDTO } from "../../dto/newUsersDto";
import AllQueries from "./queries";

import { useSelector } from "react-redux";
import { useAppSelector } from "../redux/selectors/hooks";
import { newusertype } from "../../dto/newUsersDto";
//import { NewUserQuery } from "./queries";
export const DataFromGraphql = ():NewUsersDTO[] => {

  let Newuserquery = AllQueries()[0];
   
    
    const inputfromdate=useAppSelector(state=>state.NewUser.fromDate)
   
    const inputtodate=useAppSelector(state=>state.NewUser.toDate)
    
    const { loading, error, data } = useQuery<newusertype>(Newuserquery,
        {
            variables:{Fromdate:new Date(inputfromdate),Todate:new Date(inputtodate)}
        })
      
        // const { data } = useQuery<companiesList>(COMPANIES_QUERY);
        // const tempResult : company[] = data?.companyLists!;
        // const result :company[] = [];
        // tempResult?.map((c:company)=>result.push(c));
        // return tempResult;
       
   
    if (data) {
        return data.NewUsersData

    } else if (loading) {
        console.log("Data is Loading")
        return []
    }
    else {
        console.log(`Error ${error?.message}`)
        return []
    }
}