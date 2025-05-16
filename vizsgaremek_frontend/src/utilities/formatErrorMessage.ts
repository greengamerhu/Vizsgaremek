export function formatErrorMessage(error : any )   {
    if( Array.isArray(error)) {
        return error
    } else {
        console.log("hi")
        return  [error]
    }
}