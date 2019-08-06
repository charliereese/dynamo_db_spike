module.exports = (DB, AWS) => {
	
	const documentClient = new AWS.DynamoDB.DocumentClient();

	return ({
		
		post: async (params) => {

			let err, data = await documentClient.put(params).promise();

	    if (err) {
	      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
	    } else {
	      console.log("Added item:", JSON.stringify(data, null, 2));
	    }

		},

		get: async (params) => {
			let err, data = await documentClient.get(params).promise();

	    if (err) {
	      console.error("Unable to get item. Error JSON:", JSON.stringify(err, null, 2));
	    } else {
	      console.log("Got item:", JSON.stringify(data, null, 2));
	    }
		}

	});

}