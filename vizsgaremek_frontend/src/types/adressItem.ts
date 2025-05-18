
export interface addressResponse{
    addressItems : addressItem[]
} 
export interface addressItem {
    id : number;
    address : string
    city : string
    postalCode : string
    mobileNumber : string
}