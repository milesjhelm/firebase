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
  // console.log(trainName);
  // console.log(trainDest);
  console.log(firstTime);
  console.log(tFrequency);

  // begin from old file
  // First Time (pushed back 1 year to make sure it comes before current time)
  console.log("First TIME: " + firstTime);

  var firstTimeConverted = moment(firstTime, "X").subtract(1, "years");
  console.log("First TIME converted: " + firstTimeConverted);


  // Current Time
  var currentTime = moment();

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  // console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var nextTrainPretty = moment.unix(nextTrain).format("hh:mm");



  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  tFrequency + "</td><td>" + nextTrainPretty + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});


