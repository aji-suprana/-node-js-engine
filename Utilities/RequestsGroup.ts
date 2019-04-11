import express = require('express');
import * as core from "express-serve-static-core";
import {HTTPMethodType}  from "./HTTPMethodType"
const EngineInstance = require("../index").EngineInstance;
import * as index from "../index"

const router = require('express').Router();

class RequestGroup{
    expressApp:express.Application = express();
    requestGroupName:string = 'null';
    requestGroupPath:string = 'null';
    isInitialized:boolean = false;

    constructor(_requestGroupName:string){
        this.requestGroupName =_requestGroupName;
        this.requestGroupPath = "/"+ _requestGroupName;
        //QG_Engine.RegisterRequestGroup(this);
    }

    Initialize(expressApp: express.Application)
    {
        if(this.isInitialized === true){return}
        this.isInitialized = true;
        console.log("RequestGroup["+this.requestGroupName+"] is Initializing.....")
        this.expressApp = expressApp;
        this.RegisterHTTPMethods();
        this.RoutesHandler();
    }


    getInstance()
    {
        throw "RequestGroup Classes have to implement getInstance method and instance variable for singleton";
    }

    RegisterHTTPMethods()
    {
        throw "RequestGroup Classes have to implement RegisterHTTPMethods() method";
    }

    RoutesHandler()
    {
        this.expressApp.use(this.requestGroupPath,router);
    }

    RegisterHTTPMethod(MethodType:HTTPMethodType,routerName:string,requestCB:core.RequestHandler)
    {
        var path = '/'+routerName;
        var methodTypeName = HTTPMethodType[MethodType];
        switch(MethodType)
        {
            case HTTPMethodType.copy: router.copy(path,requestCB); this.DebugRegisteredHTTPMethod(methodTypeName,path);break;
            case HTTPMethodType.delete: router.delete(path,requestCB);this.DebugRegisteredHTTPMethod(methodTypeName,path); break;
            case HTTPMethodType.get: router.get(path,requestCB); this.DebugRegisteredHTTPMethod(methodTypeName,path);break;
            case HTTPMethodType.head: router.head(path,requestCB);this.DebugRegisteredHTTPMethod(methodTypeName,path); break;
            case HTTPMethodType.link: router.link(path,requestCB);this.DebugRegisteredHTTPMethod(methodTypeName,path); break;
            case HTTPMethodType.lock: router.lock(path,requestCB);this.DebugRegisteredHTTPMethod(methodTypeName,path); break;
            case HTTPMethodType.options: router.options(path,requestCB);this.DebugRegisteredHTTPMethod(methodTypeName,path); break;
            case HTTPMethodType.patch: router.patch(path,requestCB);this.DebugRegisteredHTTPMethod(methodTypeName,path); break;
            case HTTPMethodType.post: router.post(path,requestCB); this.DebugRegisteredHTTPMethod(methodTypeName,path);break;
            case HTTPMethodType.propfind: router.propfind(path,requestCB);this.DebugRegisteredHTTPMethod(methodTypeName,path); break;
            case HTTPMethodType.purge: router.purge(path,requestCB); this.DebugRegisteredHTTPMethod(methodTypeName,path);break;
            case HTTPMethodType.put: router.put(path,requestCB); this.DebugRegisteredHTTPMethod(methodTypeName,path);break;
            case HTTPMethodType.unlink: router.unlink(path,requestCB);this.DebugRegisteredHTTPMethod(methodTypeName,path); break;
            case HTTPMethodType.unlock: router.unlock(path,requestCB); this.DebugRegisteredHTTPMethod(methodTypeName,path);break;
            case HTTPMethodType.view: router.view(path,requestCB); this.DebugRegisteredHTTPMethod(methodTypeName,path);break;
            default: console.log("HttpMethod does not exist");
        }
    }

    DebugRegisteredHTTPMethod(methodName:string,path:string){
        console.log("registered httpmethod:"+methodName+" ,at path:"+this.requestGroupPath+path);
    }

}

export {RequestGroup}