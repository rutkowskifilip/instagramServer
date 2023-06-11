const usersController = require("../user/usersController");
const jwt = require("../utils/jwt");
const getRequestData = require("../utils/getRequestData");

const profileRouter = async (req, res) => {
  if (req.url == "/api/profile" && req.method == "POST") {
    // add profile photo
    // fileController.add(req, res);
  } else if (req.url == "/api/profile" && req.method == "GET") {
    // get user info

    const bearerHeader = req.headers.authorization;

    const [bearer, token] = bearerHeader.split(" ");
    req.token = token;
    console.log(token);
    res.setHeader("Content-Type", "application/json");
    res.end(await usersController.get(res, token));

    // res.end(mediaController.getall());
  } else if (req.url == "/api/profile" && req.method == "PATCH") {
    // update user info
    console.log("here");
    const data = await getRequestData(req);
    const bearerHeader = req.headers.authorization;

    const [bearer, token] = bearerHeader.split(" ");
    res.setHeader("Content-Type", "application/json");
    res.end(await usersController.update(res, token, JSON.parse(data)));
  }
};

module.exports = profileRouter;
