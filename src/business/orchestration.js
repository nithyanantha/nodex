import graphQlclient from '../services/graphql';

import logger from '../common/logging/logger.js';
import config from '../config/config';
import errorMessage from '../common/errors/error';

module.exports = 
{
	sayHello:function(message,done)
	{
	   sayHellotoWorld(message,function(err,result)
		{
 		if(err) {callback(err);}
		else
		{
		done(null,result);
		}

		});
	   
        }
}

function sayHellotoWorld(message,callback)
{
		try
		{
		
		graphQlclient.sayHello(message,function(err,data)
			{
				let retry = 0;
				if(err)
				{
					logger.info("Error Received from kafka service layer to business");
					
					var eObject = new Error('UnKnown Error');
					throw eObject;
				}
				else
				{
				logger.info("Message Processed Successful in graphql service");

				logger.info("data:" + JSON.stringify(data));
				callback(null,data);
				}
			});

		}
		catch(ex)
		{
			logger.info('Un Handleded Exception Occurs');
			callback(ex);
		}
		

}
