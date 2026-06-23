
import { ReportHandler } from '../utils/request-handler';
export async function createtoken(api:ReportHandler, email:string,password:string) {

    const tokenresponse = await api.path('/users/login').body({
        "user": {
            "email": email, "password": password
        }
    }).postrequest(200)

    

    return  'Token ' + tokenresponse.user.token;
   
}