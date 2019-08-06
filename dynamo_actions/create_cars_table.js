module.exports = async (DB, AWS=null) => {

	let err, data = await DB.listTables().promise();
	let dbTableNames = data.TableNames;
	console.log('listTables:\n', data);
	
	const newTableParams = {
	    TableName : "Cars",
	    KeySchema: [       
	        { AttributeName: "carId", KeyType: "HASH"},  // Partition key
	        { AttributeName: "make", KeyType: "RANGE" },  //Sort key
	    ],
	    AttributeDefinitions: [       
	        { AttributeName: "carId", AttributeType: "N" },
	        { AttributeName: "make", AttributeType: "S" },
	    ],
	    ProvisionedThroughput: {       
	        ReadCapacityUnits: 10, 
	        WriteCapacityUnits: 10,
	    }
	};

	if (dbTableNames && !dbTableNames.includes('Cars')) {
		err, data = await DB.createTable(newTableParams).promise();
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
	}
	
};