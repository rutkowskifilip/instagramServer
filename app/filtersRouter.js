const filtersController = require("./filtersController");
const getRequestData = require("./getRequestData");
const jsonController = require("./jsonController");
const filtersRouter = async (req, res) => {
  if (
    req.url.match(/\/api\/filters\/metadata\/([0-9]+)/) &&
    req.method == "GET"
  ) {
    // get file metadata
    const id = req.url.split("/").at(-1);

    res.setHeader("Content-Type", "application/json");
    res.end(await filtersController.metadata(id, res));
  } else if (req.url == "/api/filters" && req.method == "PATCH") {
    // filter file
    const { id, ...data } = JSON.parse(await getRequestData(req));
    const { url } = JSON.parse(jsonController.get(id));

    res.setHeader("Content-Type", "application/json");
    if (url) {
      res.end(await filtersController.filter(data, url, res));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "file does not exist" }));
    }
  }
};

module.exports = filtersRouter;
