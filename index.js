const { timeEnd } = require("console");
const { read } = require("fs");
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

const { nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  printPassTimes(passTimes);
});

const printPassTimes = (passTimes) => {
  passTimes.forEach((time) => {
    console.log(
      `Next pass at ${new Date(time.risetime * 1000).toLocaleString("en-us", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      })} for ${time.duration} seconds.`
    );
  });
};

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsByIP("108.172.49.129", (error, data) => {
//   if (error) {
//     console.log(
//       `It didn't work! Error: Success status was ${error.success}. Server message says: ${error.message} for IP ${error.ip}`
//     );
//     return;
//   }

//   console.log("here are the coordinates:", data);
// });

// // fetchCoordsByIP("42", (error, data) => {
// //   if (error) {
// //     console.log(
// //       `It didn't work! Error: Success status was ${error.success}. Server message says: ${error.message} for IP ${error.ip}`
// //     );
// //     return;
// //   }

// //   console.log("here are the coordinates:", data);
// // });

// fetchISSFlyOverTimes(
//   { latitude: 49.2827291, longitude: -123.1207375 },
//   (error, data) => {
//     if (error) {
//       console.log(`It didn't work! ${error}`);
//       return;
//     }

//     console.log("here are the flyovertimes:", data);
//   }
// );

module.exports = { printPassTimes };
