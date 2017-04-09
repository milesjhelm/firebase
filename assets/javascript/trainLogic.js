/* global firebase moment */
// Steps to complete:


// Initialize Firebase
var config = {
  apiKey: "AIzaSyCybPGBlidsE9J9QR_tP4WZJ39koZKcCX8",
  authDomain: "train-schedule-431f8.firebaseapp.com",
  databaseURL: "https://train-schedule-431f8.firebaseio.com",
  projectId: "train-schedule-431f8",
  storageBucket: "train-schedule-431f8.appspot.com",
  messagingSenderId: "49770641681"
};

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  alert(firstTrain);

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    role: trainDest,
    start: firstTrain,
    rate: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.role);
  console.log(newTrain.start);
  console.log(newTrain.rate);

  // Alert
  // alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");

  // Prevents moving to new page
  return false;
});

// Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().role;
  var firstTrain = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().rate;

  // Employee Info
  console.log(trainName);
  console.log(trainDest);
  console.log(firstTrain);
  console.log(trainFrequency);

  // Format start
  var firstTrainPretty = moment.unix(firstTrain).format("HH:mm");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment.unix(firstTrain, "X"), "months");
  console.log(empMonths);

  // Calculate the total billed rate
  var empBilled = empMonths * trainFrequency;
  console.log(empBilled);

  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  firstTrainPretty + "</td><td>" + empMonths + "</td><td>" + trainFrequency + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
