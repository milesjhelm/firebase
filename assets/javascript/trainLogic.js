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
  var firstTime = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
  var tFrequency = $("#frequency-input").val().trim();



  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    start: firstTime,
    rate: tFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.rate);

  // Alert
  // alert("Train successfully added");
  alert(firstTime);
  alert(moment(firstTime).diff(moment(), "minutes"));

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
  var trainDest = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().start;
  var tFrequency = childSnapshot.val().rate;

  // Employee Info
  console.log(trainName);
  console.log(trainDest);
  console.log(firstTime);
  console.log(tFrequency);

  // begin from old file
      // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

  // end from old file

  // Format start
  var firstTimePretty = moment.unix(firstTime).format("HH:mm");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment.unix(firstTime, "X"), "months");
  console.log(empMonths);

  // Calculate the total billed rate
  var empBilled = empMonths * tFrequency;
  console.log(empBilled);

  // Add each train's data into the table
  // $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  // firstTimePretty + "</td><td>" + empMonths + "</td><td>" + tFrequency + "</td></tr>");
  $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  tFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
