const { fetchMyIP, fetchCoordsByIP } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned IP:", ip);
});

fetchCoordsByIP("42", (error, data) => {
  if (error) {
    console.log(
      `It didn't work! Error: Success status was ${error.success}. Server message says: ${error.message} for IP ${error.ip}`
    );
    return;
  }

  console.log("here are the coordinates:", data);
});
