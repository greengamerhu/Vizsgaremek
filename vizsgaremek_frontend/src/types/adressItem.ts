
export interface addressResponse{
    address : addressItem[]
} 
export interface addressItem {
    id : number;
    address : string
    city : string
    postalCode : string
    mobileNumber : string
}