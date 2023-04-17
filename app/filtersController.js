const sharp = require("sharp");
const jsonController = require("./jsonController");
module.exports = {
  metadata: async (id) => {
    const { url } = JSON.parse(jsonController.get(id));

    return new Promise(async (resolve, reject) => {
      try {
        if (url) {
          console.log(url);
          let meta = await sharp(url).metadata();
          console.log(meta);
          resolve(JSON.stringify(meta));
        } else {
          resolve("url_not_found");
        }
      } catch (err) {
        reject(err.mesage);
      }
    });
  },

  filter: async (data, url) => {
    const { lastChange: type } = data;
    let newUrl =
      url.split(".").at(0) + "-" + type + "." + url.split(".").at(-1);
    console.log(newUrl);
    switch (type) {
      case "rotate":
        const { rotate } = data;
        await sharp(url).rotate(rotate).toFile(newUrl);
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
        await sharp(url).grayscale.toFile(newUrl);
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
        break;
    }
  },
};
