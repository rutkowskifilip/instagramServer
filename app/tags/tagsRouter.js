const tagsController = require("./tagsController");
const getRequestData = require("../utils/getRequestData");
const tagsRouter = async (req, res) => {
  console.log(req.url);
  if (req.url == "/api/tags" && req.method == "POST") {
    // create one tag

    const data = await getRequestData(req);
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 201;
    res.end(tagsController.add(res, JSON.parse(data)));
  } else if (req.url == "/api/tags/raw" && req.method == "GET") {
    // get all tags raw

    res.setHeader("Content-Type", "application/json");
    res.end(tagsController.getAllRaw());
  } else if (req.url == "/api/tags" && req.method == "GET") {
    // get all tags object

    res.setHeader("Content-Type", "application/json");
    res.end(tagsController.getAll());
  } else if (req.url.match(/\/api\/tags\/([0-9]+)/) && req.method == "GET") {
    // get one tag

    res.setHeader("Content-Type", "application/json");
    const id = req.url.split("/").at(-1);
    res.end(tagsController.getOneById(id));
  }
};

module.exports = tagsRouter;
