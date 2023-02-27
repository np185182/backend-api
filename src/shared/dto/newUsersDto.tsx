export type NewUsersDTO={
    __typename:String,
    companyCreatedTimeStamp:String,
    namesOfCompanies:String[],
    frequency:Number

}
export type newusertype={
    NewUsersData:NewUsersDTO[]
}