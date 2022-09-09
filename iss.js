/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require("request");

const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    const { ip } = data;
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);
    if (!latitude && !longitude) {
      callback(JSON.parse(body));
    } else {
      const coords = { latitude, longitude };
      callback(null, coords);
    }
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(
    `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      const parsedBody = JSON.parse(body);
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching data. Response: ${parsedBody}`;
        callback(Error(msg), null);
        return;
      } else {
        callback(null, parsedBody.response);
      }
    }
  );
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) return;
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) return;
      fetchISSFlyOverTimes(coords, callback);
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};
