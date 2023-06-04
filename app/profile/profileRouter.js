const usersController = require("../user/usersController");
const jwt = require("../utils/jwt");
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
    //     res.setHeader("Content-Type", "application/json");
    //     res.end(mediaController.getall());
  }
};

module.exports = profileRouter;
