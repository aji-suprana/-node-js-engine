import express = require('express');
import * as core from "express-serve-static-core";
import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";

class ErrorHandler {
    expressApp:express.Application = express();
    Initialize(e: core.Express) {
        this.expressApp = e;
        this.RoutesHandler();
    }

    RoutesHandler() {
        //Prevent CORS ERROR
        this.expressApp.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers',
                'Origin,X-Requested-With, Content-Type,Accept,Authorization'
            );
            if (req.method === 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
                return res.status(200).json({});
            }
            next();
        });

        
        //Handling all Errors
        this.expressApp.use((req, res, next) => {
            let error:any;
            error = new Error('Not found');
            error.status = 404;
            next(error);
        })

        this.expressApp.use((error:any, req:Request, res:Response, next:NextFunction) => {
            res.status(error.status || 500);
            res.json({
                error: {
                    message: error.message
                }
            });
        })

    }
}

var classInstance = new ErrorHandler();
var name = classInstance.constructor.name;
module.exports = classInstance;
