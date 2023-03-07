export type NewUsersDTO={
    __typename:String,
    companyCreatedTimeStamp:String,
    namesOfCompanies:String[],
    frequency:number

}
export type newusertype={
    NewUsersData:NewUsersDTO[]
}