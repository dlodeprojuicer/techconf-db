const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// http request 1
exports.randomNumber = functions.https.onRequest((request, response) => {
  const number = Math.round(Math.random * 100);
  response.send(number.toString());
});

// http request 2
exports.toTechConf = functions.https.onRequest((request, response) => {
  response.redirect("https://techconf-db.com");
});

// http callback function
exports.sayHello = functions.https.onCall((data, context) => {
  retrun `Hello, ninjas`;
});