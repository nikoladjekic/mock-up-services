const express = require("express");
const router = express.Router();

// import mock-up services
const { getMethod } = require("../services/mock.services");

// default route
router.get("/", (req, res) => res.send("Hello from basic API route"));

// mock-up routes
router.get("/mock", getMethod);

// export the routes
module.exports = router;
