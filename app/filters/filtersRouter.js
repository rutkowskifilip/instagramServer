const filtersController = require("./filtersController");
const getRequestData = require("../utils/getRequestData");
const mediaController = require("../media/mediaController");
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
    const image = mediaController.get(id);

    res.setHeader("Content-Type", "application/json");
    if (image) {
      res.end(await filtersController.filter(id, data, image, res));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "file does not exist" }));
    }
  }
};

module.exports = filtersRouter;
