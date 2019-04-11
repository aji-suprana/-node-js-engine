import express = require('express');
import * as core from "express-serve-static-core";
import {HTTPMethodType}  from "./HTTPMethodType"

type FunctionType1 = (x: string, y: number) => number;
const router = require('express').Router();


class RequestGroup{
    expressApp:express.Application = express();

    //http://<url>/[requestGroupPath]/
    requestGroupPath:string = 'null';
    Initialize(expressApp: express.Application ,_requestGroupPath:string){
        this.expressApp = expressApp;
        this.requestGroupPath = "/"+ _requestGroupPath;
        console.log("Request Group "+this.requestGroupPath + " Initialized");
        this.RegisterHTTPMethods();
        this.RoutesHandler();

    }

    RegisterHTTPMethods()
    {
        throw "Request Group Child Classes have to implement RegisterHTTPMethods() method";
    }

    RoutesHandler()
    {
        this.expressApp.use(this.requestGroupPath,router);
    }

    RegisterHTTPMethod(MethodType:HTTPMethodType,path:string,requestCB:core.RequestHandler)
    {
        var curPath = '/'+path;
        var methodTypeName = HTTPMethodType[MethodType];
        switch(MethodType)
        {
            case HTTPMethodType.copy: router.copy(curPath,requestCB); this.DebugRegisteredHTTPMethod(methodTypeName,path);break;
            case HTTPMethodType.delete: router.delete(curPath,requestCB);this.DebugRegisteredHTTPMethod(methodTypeName,path); break;
            case HTTPMethodType.get: router.get(curPath,requestCB); this.DebugRegisteredHTTPMethod(methodTypeName,path);break;
            case HTTPMethodType.head: router.head(curPath,requestCB);this.DebugRegisteredHTTPMethod(methodTypeName,path); break;
            case HTTPMethodType.link: router.link(curPath,requestCB);this.DebugRegisteredHTTPMethod(methodTypeName,path); break;
            case HTTPMethodType.lock: router.lock(curPath,requestCB);this.DebugRegisteredHTTPMethod(methodTypeName,path); break;
            case HTTPMethodType.options: router.options(curPath,requestCB);this.DebugRegisteredHTTPMethod(methodTypeName,path); break;
            case HTTPMethodType.patch: router.patch(curPath,requestCB);this.DebugRegisteredHTTPMethod(methodTypeName,path); break;
            case HTTPMethodType.post: router.post(curPath,requestCB); this.DebugRegisteredHTTPMethod(methodTypeName,path);break;
            case HTTPMethodType.propfind: router.propfind(curPath,requestCB);this.DebugRegisteredHTTPMethod(methodTypeName,path); break;
            case HTTPMethodType.purge: router.purge(curPath,requestCB); this.DebugRegisteredHTTPMethod(methodTypeName,path);break;
            case HTTPMethodType.put: router.put(curPath,requestCB); this.DebugRegisteredHTTPMethod(methodTypeName,path);break;
            case HTTPMethodType.unlink: router.unlink(curPath,requestCB);this.DebugRegisteredHTTPMethod(methodTypeName,path); break;
            case HTTPMethodType.unlock: router.unlock(curPath,requestCB); this.DebugRegisteredHTTPMethod(methodTypeName,path);break;
            case HTTPMethodType.view: router.view(curPath,requestCB); this.DebugRegisteredHTTPMethod(methodTypeName,path);break;
            default: console.log("HttpMethod does not exist");
        }
    }

    DebugRegisteredHTTPMethod(methodName:string,path:string){
        console.log("registered httpmethod:"+methodName+",with path: /"+path);
    }

}

export {RequestGroup}