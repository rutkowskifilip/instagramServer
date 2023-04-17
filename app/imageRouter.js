const fileController = require("./fileController");
const jsonController = require("./jsonController");
const getRequestData = require("./getRequestData");
const imageRouter = async (req, res) => {
  if (req.url == "/api/photos" && req.method == "POST") {
    // add one photo

    fileController.add(req, res);
  } else if (req.url == "/api/photos" && req.method == "GET") {
    // get all photos

    res.setHeader("Content-Type", "application/json");

    res.end(jsonController.getall());
  } else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "GET") {
    // get photo by id

    const id = req.url.split("/").at(-1);
    res.setHeader("Content-Type", "application/json");

    res.end(jsonController.get(id));
  } else if (
    req.url.match(/\/api\/photos\/([0-9]+)/) &&
    req.method == "DELETE"
  ) {
    // delete one by id

    const id = req.url.split("/").at(-1);
    if (fileController.delete(id)) {
      res.end(`File with id ${id} deleted succesfully`);
    } else {
      res.statusCode = 404;
      res.end(`There's no image with id ${id}`);
    }
  } else if (req.url == "/api/photos" && req.method == "PATCH") {
  } else if (req.url == "/api/photos/tags" && req.method == "PATCH") {
    const data = await getRequestData(req);
    res.setHeader("Content-Type", "application/json");
    res.end(jsonController.updateTags(res, JSON.parse(data)));

    // add one tag to photo
  } else if (
    req.url.match(/\/api\/photos\/tags\/([0-9]+)/) &&
    req.method == "GET"
  ) {
    const id = req.url.split("/").at(-1);
    res.setHeader("Content-Type", "application/json");
    res.end(jsonController.getTags(res, id));
  }
};

module.exports = imageRouter;
