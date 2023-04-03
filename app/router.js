const fileController = require("./fileController");
const router = async (req, res) => {
  if (req.url == "/api/photos" && req.method == "POST") {
    // add one photo
    const response = fileController.add(req, res);
    console.log(response);
    // res.end(response);
  } else if (req.url == "/api/photos" && req.method == "GET") {
    const response = fileController.getall(req, res);
  } else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "GET") {
    // get one by id
  } else if (
    req.url.match(/\/api\/photos\/([0-9]+)/) &&
    req.method == "DELETE"
  ) {
    // delete one by id
  } else if (req.url == "/api/photos" && req.method == "PATCH") {
    // update one by id
  }
};

module.exports = router;
