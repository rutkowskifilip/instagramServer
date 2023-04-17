const http = require("http");
const imageRouter = require("./app/imageRouter");

const tagsRouter = require("./app/tagsRouter");
const filtersRouter = require("./app/filtersRouter");
const fileRouter = require("./app/fileRouter");
const PORT = 3000;
http
  .createServer(async (req, res) => {
    //images

    if (req.url.search("/api/photos") != -1) {
      await imageRouter(req, res);
    }

    //tags
    else if (req.url.search("/api/tags") != -1) {
      await tagsRouter(req, res);
    }
    // filters
    else if (req.url.search("/api/filters") != -1) {
      await filtersRouter(req, res);
    } else if (req.url.search("/api/getfile") != -1) {
      await fileRouter(req, res);
    }
  })
  .listen(PORT, () => console.log("listen on 3000"));
