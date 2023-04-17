const filtersController = require("./filtersController");
const getRequestData = require("./getRequestData");
const jsonController = require("./jsonController");
const fileRouter = async (req, res) => {
  if (req.url.match(/\/api\/getfile\/([0-9]+)/) && req.method == "GET") {
    console.log("here");
    const id = 1;
    const { url } = JSON.parse(jsonController.get(id));
  }
};

module.exports = fileRouter;
