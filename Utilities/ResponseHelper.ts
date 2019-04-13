import {Document} from 'mongoose'
import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import { debug } from "util";

export class ResponseHelper{
    RequestName:string = "none";
    responseBody:Response;
    requestBody:Request;

    constructor(name:string,res:Response,req:Request)
    {
        this.RequestName = name;
        this.responseBody = res;
        this.requestBody= req;
    }
    JsonRequest_Succeded()
    {
        var jsonObj = {
            "request":"." + this.RequestName+ "Request",
            ...this.requestBody.body
        };
        delete jsonObj["__v"];
        console.log(jsonObj);
        
        return jsonObj;  
    }

    JSONResponse_Succeded(result:Object)
    {
        var jsonObj = {
            "response":"." + this.RequestName+"Response",
            ...result
        };

        console.log(jsonObj);
        
        return jsonObj;
    }

    DocResponse_Succeded(result:Document)
    {
        var jsonObj = {
            "response":"." + this.RequestName+"Response",
            ...result.toObject()
        };
        delete jsonObj["__v"];
        console.log(jsonObj);
        
        return jsonObj;
    }
    
    StringResponse_Succeded(result:string)
    {
        var jsonObj = {
            "response":"." + this.RequestName+"Response",
            "message" : result
        };        
        console.log(jsonObj);

        return jsonObj;
    }

    JsonResponse_Failed(err:any)
    {
        var jsonObj = {
            "response":"." + this.RequestName+"Response",
            error: err
        };
        console.log(jsonObj);
        
        return jsonObj;
    }

    HTTP_OK_StringResponse(result:string)
    {
        return this.responseBody.status(200).json(this.StringResponse_Succeded(result));
    }
    HTTP_OK_DocResponse(result:Document)
    {
        return this.responseBody.status(200).json(this.DocResponse_Succeded(result));
    }
    HTTP_OK_JSONResponse(result:Object)
    {
        return this.responseBody.status(200).json(this.JSONResponse_Succeded(result));
    }

    HTTP_Unauthorized(err:any)
    {
        return this.responseBody.status(401).json(this.JsonResponse_Failed(err));
    }

    HTTP_UnprocessableEntity(err:any)
    {
        return this.responseBody.status(422).json(this.JsonResponse_Failed(err));
    }

    HTTP_InternalServerError(err:any)
    {
        return this.responseBody.status(500).json(this.JsonResponse_Failed(err));
    }
}




