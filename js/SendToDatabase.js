// Initialize the MongoDB Realm app
const app = new Realm.App({ id: "bt-yjurt" });

// Authenticate the user
const credentials = Realm.Credentials.anonymous();
app.logIn(credentials).then((user) => {
  console.log("Logged in as user " + user.id);

  // Get a reference to the function
  const insertDocument = app.functions["Fun"];

  // Call the function and insert the tracking data into the database
  const locationButton = document.getElementById("enter-button");
  locationButton.addEventListener("click", () => {
    getLocation((trackingData) => {
      insertDocument.call({ document: trackingData }).then((result) => {
        console.log("Document inserted");
      }).catch((error) => {
        console.log(error);
      });
    });
  });
}).catch((error) => {
  console.log(error);
});


