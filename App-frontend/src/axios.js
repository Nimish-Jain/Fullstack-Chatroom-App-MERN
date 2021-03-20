const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:8002",
});

module.exports = instance;
