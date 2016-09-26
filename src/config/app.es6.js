"use strict";
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import router from '../routes/orchestration';
import config from './config';
import identity from '../common/security/identity';
import logger from '../common/logging/logger';
import errorMessage from '../common/errors/error';
import cors from 'cors';
var app = express();

var corsOptions = {
  origin: ["https://secure.tesco.com", "http://tesco.com","http://www.tesco.com"]
};

app.use(cors(corsOptions));

function configureApplication(app) {
    configureSecurity(app);
    ValidateContent(app);
    configureSettings(app);
    configureRoutes(app);
    configureErrorHandler(app);
    startServer(app);
}



function configureSettings(app) {
	app.use(bodyParser.json({limit : '100kb'}));

    app.use(function (req, res, next) {
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        res.type('application/json');


        next();
    });
}

function configureSecurity(app)
{
    app.use(function(req,res,next)
    {
       
        identity.validateIdentity(req,function(isValid)
            {

                if(!isValid)
                {
                   throw new errorMessage("UnAuthorized",401,'Identity is not Valid');
                }
                next();
            });
        

    });

}

function ValidateContent(app)
{
  app.use('/orchestration/', function(req, res, next) {

    
  var contype = req.headers['content-type'];
  if (!contype || contype.indexOf('application/json') !== 0)
    throw new errorMessage("BadRequest",400,'Content is not Valid');
  next();
       
});

}

function configureRoutes(app) {
    app.use('/',router);
}

function configureErrorHandler(app) {
    app.use(function (err, req, res, next) {
        if (err) {

             if(err.statusCode==undefined||null)
             {
                err.statusCode=500;
             }
             if(err.message==undefined||null)
             {
                err.message='Error Occured';
             }

             switch (err.name) {
                 case 'UnAuthorized':
                     logger.error('Error Name: %s, Error Message: %s, Error StatusCode:%s,Error Stack:%s', err.name,err.message,err.statusCode,err.stack);
                     res.status(err.statusCode).json({message: err.name + ' ' +  err.message, statusCode: err.statusCode});
                     res.end();
                     break;
                 case 'BadRequest':
                    logger.error('Error Name: %s, Error Message: %s, Error StatusCode:%s,Error Stack:%s', err.name,err.message,err.statusCode,err.stack);
                     res.status(err.statusCode).json({message: err.name + ' ' +  err.message, statusCode: err.statusCode});
                     res.end();
                     break;
                 case 'InternalError':
                    logger.error('Error Name: %s, Error Message: %s, Error StatusCode:%s,Error Stack:%s', err.name,err.message,err.statusCode,err.stack);
                     res.status(err.statusCode).json({message: err.name + ' ' +  err.message, statusCode: err.statusCode});
                     res.end();
                     break;
                 default:
                     logger.error('Error Name: %s, Error Message: %s, Error StatusCode:%s,Error Stack:%s', err.name,err.message,err.statusCode,err.stack);
                     res.status(err.statusCode).json({message: err.name + ' ' +  err.message, statusCode: err.statusCode});
                     res.end();
                     break;
             }
        }

        next();
    });
}

function startServer(app) {
    var server = http.createServer(app);

    // server.listen(config.settings.workerPort, config.settings.hostName, config.settings.queueLength, function () {
    //     console.log('listening at http://%s:%s', config.settings.hostName, config.settings.workerPort);
    // });

    server.listen(config.settings.workerPort, function () {
        console.log('MAPI Orchestration Api Server Started with the port:%s, Environment: %s', config.settings.workerPort, config.settings.environment);
    });
}


configureApplication(app);
