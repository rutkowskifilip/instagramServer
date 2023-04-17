const filtersController = require("./filtersController");
const getRequestData = require("./getRequestData");
const jsonController = require("./jsonController");
const filtersRouter = async (req, res) => {
  if (
    req.url.match(/\/api\/filters\/metadata\/([0-9]+)/) &&
    req.method == "GET"
  ) {
    const id = req.url.split("/").at(-1);

    res.setHeader("Content-Type", "application/json");
    res.end(await filtersController.metadata(id));
  } else if (req.url == "/api/filters" && req.method == "PATCH") {
    // get all tags raw
    const { id, ...data } = JSON.parse(await getRequestData(req));
    const { url } = JSON.parse(jsonController.get(id));

    res.end(await filtersController.filter(data, url));
  }
};

module.exports = filtersRouter;
