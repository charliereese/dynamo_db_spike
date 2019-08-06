///////////////////////////////////
// 1. Configure AWS
///////////////////////////////////

require('./js_extensions/async_for_each');

const AWS = require('aws-sdk');
AWS.config.update({ 
	accessKeyId: process.env.AWS_ACCESS_KEY, 
	secretAccessKey: process.env.AWS_SECRET_KEY, 
	region: 'us-east-1',
	endpoint: 'http://localhost:8000',
});
const DB = new AWS.DynamoDB();

///////////////////////////////////
// 2. DB actions
///////////////////////////////////

(async () => {
	
	// Create cars table
	let createCarsTable = require('./dynamo_actions/create_cars_table');
	await createCarsTable(DB, AWS);
	
	// Extract, transform, load car data
	let etlCars = require('./dynamo_actions/etl_cars');
	await etlCars(DB, AWS);

	// Put item to table
	let updateDB = require('./dynamo_actions/update_db')(DB, AWS);
	await updateDB.post({
		TableName: 'Cars',
		Item: {
			carId: 9,
			make: 'Ford',
			year: 2018,
			model: 'F-250',
		},
		ReturnValues: 'ALL_OLD'
	});

	// Get item
	await updateDB.get({
		TableName: 'Cars',
		Key: {
			carId: 2,
			make: 'Toyota'
		}
	});

})();