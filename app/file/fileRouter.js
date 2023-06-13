const mediaController = require("../media/mediaController");
const fs = require("fs");
const fileRouter = async (req, res) => {
  if (
    req.url.match(/\/api\/getfile\/([0-9]+)\/([a-zA-Z]+)/) &&
    req.method == "GET"
  ) {
    const id = req.url.split("/").at(-2);
    const type = req.url.split("/").at(-1);
    const { url } = mediaController.get(id);
    if (url) {
      const filePath =
        url.split(".").at(0) + "-" + type + "." + url.split(".").at(-1);
      if (fs.existsSync(url)) {
        res.setHeader("Content-Type", "image/jpeg");
        var readStream = fs.createReadStream(url);
        readStream.pipe(res);
      } else {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "file does not exist" }));
      }
    } else {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "file does not exist" }));
    }
  } else if (req.url.match(/\/api\/getfile\/([0-9]+)/) && req.method == "GET") {
    const id = req.url.split("/").at(-1);

    const { url } = mediaController.get(id);
    console.log(url);
    if (url) {
      if (fs.existsSync(url)) {
        res.setHeader("Content-Type", "image/jpeg");
        var readStream = fs.createReadStream(url);
        readStream.pipe(res);
      } else {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "file does not exist" }));
      }
    } else {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "file does not exist" }));
    }
  } else if (
    req.url.match(/\/api\/getfile\/profile\/([0-9]+)/) &&
    req.method == "GET"
  ) {
    const id = req.url.split("/").at(-1);

    const { url } = JSON.parse(mediaController.getProfilePic(id));
    if (url) {
      if (fs.existsSync(url)) {
        res.setHeader("Content-Type", "image/jpeg");
        var readStream = fs.createReadStream(url);
        readStream.pipe(res);
      } else {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "file does not exist" }));
      }
    } else {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "file does not exist" }));
    }
  } else if (
    req.url.match(/\/api\/getfile\/([a-zA-Z]+)/) &&
    req.method == "GET"
  ) {
    const albumName = req.url.split("/").at(-1);
    res.setHeader("Content-Type", "application/json");
    res.end(mediaController.getByAlbum(albumName));
  }
};

module.exports = fileRouter;
