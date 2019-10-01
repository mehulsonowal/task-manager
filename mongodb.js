// CRUD create read update delete

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());

// Summary:
// 1. instead of an id counter like in SQL, mongodb uses a hash to ensure decreased collisions
// 2. within the id is data about the document
// 3. we can create an id using the node mongodb package
// 4. we can assigne this id to documents, though that is not usually necessary
// 5. stored as hex instead of as a string to reduce size

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      console.log("Unable to connect to database!");
    }

    console.log("Connected Correctly");

    // Inserting a document
    // 1. we need the name of the database
    // 2. this allows use to get a database reference
    // 3. we need to specify which collection we want to access
    // 4. we can use the db.collection('name').insertOne function to insert data

    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    // 	name: 'Mehul',
    // 	age: 19
    // }, (error, result) => {
    // 	if(error){
    // 	    return console.log('Unable to insert user');
    // 	}

    // 	console.log(result.ops); // ops is an array of documents inserted
    // });

    // db.collection("tasks").insertMany(
    // 	[{ description: "Eat", completed: true }, { description: "Work", copmleted: false },
    // 	 { description: "Sleep", completed: false }],
    //   (error, result) => {
    //     if (error) {
    //       console.log("Unable to insert documents");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // if we open up MongoDB there is an extra field called _id which is a unique identifier for the document

    // Summary:
    // 1. opened up connection to mongodb server
    // 2. we imported the mongodb package to connect to the server from node
    // 3. we inserted data into the database and viewed it with Robo 3T

    // db.collection("users").findOne({ name: "Mehul" }, (error, user) => {
    //   if (error) {
    //     return console.log("Unable to fetch");
    //   }

    //   console.log(user);
    // });

    // db.collection("users").find({ age: 19 }).toArray((error, users) => {
    // 	console.log(users);
    // })

      // db.collection("tasks").findOne({ _id: new ObjectID("5d26b7396364c229c86bd95b")}, (error, task) => {
      // 	  if(error){
      // 	      return console.log("Unable to fetch");
      // 	  }

      // 	  console.log(task);
      // })

      // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
      // 	  if(error){
      // 	      return console.log('Unable to fetch');
      // 	  }

      // 	  console.log(tasks);
      // })

      // Summary:
      // 1. we can read data from a collection by using the find function
      // 2. we can search for documents by passing in an object with the fields we want
      // 3. we can search for one document only by using the findOne function

      // const updatePromise = db.collection('users').updateOne({
      // 	  _id: new ObjectID("5d26b045f7c45e1da84257fe") // target the document
      // }, {
      // 	  $inc: {
      // 	      age: 1
      // 	  }
      // });

      // updatePromise.then((result) => {
      // 	  console.log(result);
      // }).catch((error) => {
      // 	  console.log(error);
      // });

      // Summary:
      // 1. we can update information by using the updateOne function
      // 2. we can search for the specified document by using the object notation
      // 3. in order to update the information we need to use update operators
      // 4. if no callback is passed in, a promise is returned which we can use to handle the response
      // db.collection('tasks').updateMany({
      // 	  completed: false
      // }, {
      // 	  $set: {
      // 	      completed: true
      // 	  }
      // }).then((result) => {
      // 	  console.log(result);
      // }).catch((error) => {
      // 	  console.log(error);
      // });

      db.collection('users').deleteMany({
	  age: 19
      }).then((result) => {
	  console.log(result);
      }).catch((error) => {
	  console.log(error);
      });

      db.collection('tasks').deleteOne({
	  _id: new ObjectID("5d26b7396364c229c86bd959")
      }).then((result) => {
	  console.log(result);
      }).catch((error) => {
	  console.log(error);
      });
	  
  }
);
