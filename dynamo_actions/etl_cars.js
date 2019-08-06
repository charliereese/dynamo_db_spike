module.exports = async (DB, AWS=null) => {

	const documentClient = new AWS.DynamoDB.DocumentClient();
	const fs = require('fs');
	console.log("Importing cars into DynamoDB. Please wait.");

	var allCars = JSON.parse(fs.readFileSync('data/cars.json', 'utf8'));
	
	await allCars.asyncForEach( async (car) => {
	    // TBU - load all car properties
	    // TBU - wipe and repopulate table? Is there a (SIMPLE) better way (insert if)?
	    const carParams = {
	        TableName: "Cars",
	        Item: {
	            carId: car.carId,
	            year:  car.year,
	            make: car.make,
	            model:  car.model,
	        }
	    };

	    let err, data = await documentClient.put(carParams).promise();
			if (err) {
			   console.error("ERROR! Unable to add car\n", car.year, "\t", car.make, "\t", car.model, "\nError JSON:", JSON.stringify(err, null, 2));
			} else {
			   console.log("PutItem succeeded: ", car.year, "\t", car.make, "\t", car.model);
			}
	});

};