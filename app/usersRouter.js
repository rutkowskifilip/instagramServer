const getRequestData = require("./getRequestData");
const usersController = require("./usersController");

const usersRouter = async (req, res) => {
  //   console.log(req.url);
  if (req.url == "/api/users/register" && req.method == "POST") {
    // register new user

    const data = JSON.parse(await getRequestData(req));

    usersController.register(res, data);
  } else if (
    req.url.match(/\/api\/users\/confirm\/([a-zA-Z0-9\.\-\_\$]+)/) &&
    req.method == "GET"
  ) {
    // confirm user registration
    console.log(req.url.split("/").at(-1));
  } else if (req.url == "/api/users/login" && req.method == "POST") {
    // login and return token
  } else if (req.url == "/api/users/all" && req.method == "GET") {
    // get one tag
  }
};

module.exports = usersRouter;
