const { MongoClient, ServerApiVersion } = require('mongodb');

// Replace the URI, database name, and collection name with your own values
const uri = "mongodb+srv://ahmed96tun:<password>@btt.n45wlry.mongodb.net/?retryWrites=true&w=majority";
const databaseName = "test";
const collectionName = "tracking_data";

// Create a new MongoClient and connect to the database
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true , serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
  console.log("Connected to database");

  // Define a function to insert a document into the collection
  function insertDocument(document) {
    collection.insertOne(document, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Document inserted");
    });
  }

  // Call the getLocation function and insert the tracking data into the database
  const locationButton = document.getElementById("enter-button");
  locationButton.addEventListener("click", () => {
    getLocation((trackingData) => {
      insertDocument(trackingData);
    });
  });
});
