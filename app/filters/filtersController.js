const sharp = require("sharp");
const mediaController = require("../media/mediaController");
module.exports = {
  metadata: async (id, res) => {
    const { url } = mediaController.get(id);

    return new Promise(async (resolve, reject) => {
      try {
        if (url) {
          let meta = await sharp(url).metadata();

          resolve(JSON.stringify(meta));
        } else {
          res.statusCode = 404;
          resolve(JSON.stringify({ message: "file does not exist" }));
        }
      } catch (err) {
        reject(err.mesage);
      }
    });
  },

  filter: async (id, data, image, res) => {
    const { lastChange: type } = data;
    const url = image.url;
    const types = ["jpg", "png", "webp", "gif", "avif"];
    if (types.includes(url.split(".").at(-1))) {
      let newUrl =
        url.split(".").at(0) +
        "." +
        url.split(".").at(1) +
        "-" +
        type +
        "." +
        url.split(".").at(-1);

      switch (type) {
        case "rotate":
          const { rotate } = data;
          await sharp(url).rotate(90).toFile(newUrl);
          break;
        case "resize":
          const { resize } = data;
          await sharp(url).resize(resize).toFile(newUrl);
        case "reformat":
          const { reformat } = data;
          newUrl = url.split(".").at(0) + "-" + type + "." + reformat;
          await sharp(url).toFormat(reformat).toFile(newUrl);
          break;
        case "crop":
          const { crop } = data;
          await sharp(url).extract(crop).toFile(newUrl);
          break;
        case "grayscale":
          await sharp(url).grayscale().toFile(newUrl);
          break;
        case "flip":
          await sharp(url).flip().toFile(newUrl);
          break;
        case "flop":
          await sharp(url).flop().toFile(newUrl);
          break;
        case "negate":
          await sharp(url).negate().toFile(newUrl);
          break;
        case "tint":
          const { tint } = data;
          await sharp(url).tint(tint).toFile(newUrl);
          break;
        default:
          res.statusCode = 404;
          return JSON.stringify({
            message: "wrong filter type",
            filter: type,
          });
          break;
      }

      return mediaController.update(id, type, newUrl);
    } else {
      res.statusCode = 404;
      return JSON.stringify({
        message: "wrong file type",
        filter: type,
        filetype: url.split(".").at(-1),
      });
    }
  },
};
