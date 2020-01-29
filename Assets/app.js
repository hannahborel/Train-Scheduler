
// SUDO CODE
// Create a way to submit the train information from the form to the database
// Update the form information to the HTML (create new rows and imput the values)
//

//initialize firebase

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBbnQOUWlHOBwHTe2beMxUdei1f0P6Zq0g",
    authDomain: "train-schedule-fa4b0.firebaseapp.com",
    databaseURL: "https://train-schedule-fa4b0.firebaseio.com",
    projectId: "train-schedule-fa4b0",
    storageBucket: "train-schedule-fa4b0.appspot.com",
    messagingSenderId: "773025450427",
    appId: "1:773025450427:web:da2c379f6dd597d2f01c9e",
    measurementId: "G-C1B38PZDSK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  //On click event to add train
  $("#add-train-btn").on("click", function(event){
    event.preventDefault();

  // Grabs user imput

  var trainName = $("#name-input").val().trim();
  var trainDest = $("#dest-input").val().trim();
  var trainTime = $("#time-input").val().trim();
  var trainFreq = $("#freq-input").val().trim();
  

  //create LOCAL "temporary" object for holding employee data

  var newTrain = {
    name: trainName,
    dest: trainDest,
    time: trainTime,
    freq: trainFreq,
  };

  //Uploads employee data to the new database 
  database.ref().push(newTrain);

  // console.log(newTrain.name);
  // console.log(newTrain.dest);
  // console.log(newTrain.time);
  // console.log(newTrain.freq);

  alert("Your train has been added!");


  //Clears text boxes after alert
  $("#name-input").val("");
  $("#dest-input").val("");
  $("#time-input").val("");
  $("#freq-input").val("");

});
//Create Firebase event for adding employee to the database and a row in the html when a user adds an entry. 
database.ref().on("child_added", function(childSnapshot){
  console.log(childSnapshot.val());
  
  //store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().freq;

  //Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainTime);
  console.log(trainFreq);

  // Assumptions: Frequency will be user imput the imput for frequency
  var tFrequency = $("#freq-input");

  // the first time will be the user imput for the time
  var firstTime = $("#time-input");

  // First time is the user input for time pushed back to 1 year
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  
  console.log("firstTimeConverted: "+ firstTimeConverted)


  var currentTime = moment()
  console.log("CURRENT TIME: " + currentTime);

  // Difference bewtween times
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
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
var newRow = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(trainDest),
  $("<td>").text(trainFreq),
  $("<td>").text(nextTrain),
  $("<td>").text(tRemainder),
);

//Append thenew row to the table
$("#train-schedule > tbody").append(newRow);

});         