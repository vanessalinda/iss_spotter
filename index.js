const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

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

// fetchCoordsByIP("42", (error, data) => {
//   if (error) {
//     console.log(
//       `It didn't work! Error: Success status was ${error.success}. Server message says: ${error.message} for IP ${error.ip}`
//     );
//     return;
//   }

//   console.log("here are the coordinates:", data);
// });

fetchISSFlyOverTimes(
  { latitude: 49.2827291, longitude: -123.1207375 },
  (error, data) => {
    if (error) {
      console.log(`It didn't work! ${error}`);
      return;
    }

    console.log("here are the flyovertimes:", data);
  }
);
