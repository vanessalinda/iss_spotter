const { rejects } = require("assert");
const { resolve } = require("path");
const request = require("request-promise-native");

const fetchMyIP = () => {
  return request("https://api.ipify.org/?format=json");
};

const fetchCoordsByIP = (body) => {
  const { ip } = JSON.parse(body);
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = (body) => {
  const { latitude, longitude } = JSON.parse(body);
  return request(
    `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`
  );
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = {
  nextISSTimesForMyLocation,
};
