import http from "./http"


export async function registerAPi(fullName : string, email : string, password : string, repassword : string): Promise<any> {
    const response = await http.post("/user/register", {
        "fullName": fullName,
        "email": email,
        "password": password,
        "repassword": repassword,
        }
    );
    return response
}
export async function loginApi( email : string, password : string): Promise<any> {
    const response = await http.post("/auth/login", {
        "email": email,
        "password": password,
        }
    );
    return response
}
export async function logOutApi(): Promise<any> {
    const response = await http.delete("/auth/logout");
    return response
}