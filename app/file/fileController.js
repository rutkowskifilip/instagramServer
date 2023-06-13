const formidable = require("formidable");
const fs = require("fs");
const mediaController = require("../media/mediaController");
const path = require("path");
const { log } = require("console");
module.exports = {
  add: (req, res, profile) => {
    const form = formidable({
      multiples: true,
      uploadDir: path.dirname(__dirname) + "/uploads",
      keepExtensions: true,
    });
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 201;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return err;
      } else {
        const dir = fields.directory;
        // console.log(dir);
        newDir = path.dirname(__dirname) + "/uploads/" + dir;
        const photos = [];
        if (files.file.length > 1) {
          files.file.forEach((f) => {
            const { path } = f;

            filename = path.split("\\").at(-1);
            try {
              if (!fs.existsSync(newDir)) {
                fs.mkdirSync(newDir);
              }
              fs.renameSync(path, newDir + "/" + filename);

              photos.push({ dir: newDir, filename: filename });
            } catch (error) {
              console.log(error);
            }
          });
          if (profile) {
            res.end(mediaController.addToProfile(photos));
          } else {
            res.end(mediaController.add(photos));
          }
        } else {
          const { path } = files.file;
          filename = path.split("\\").at(-1);
          try {
            if (!fs.existsSync(newDir)) {
              fs.mkdirSync(newDir);
            }
            fs.renameSync(path, newDir + "/" + filename);
            photos.push({ dir: newDir, filename: filename });
          } catch (error) {
            console.log(error);
          }

          if (profile) {
            res.end(mediaController.addToProfile(photos));
          } else {
            res.end(mediaController.add(photos));
          }
        }
      }
    });
  },

  delete: (id) => {
    // // delete by id
    // console.log(id);
    const image = mediaController.delete(id);
    if (image !== 0) {
      try {
        fs.unlinkSync(image.url + "/" + image.originalName);
        return true;
      } catch (error) {
        console.log(error);
      }
    } else {
      return false;
    }
  },
  update: (id) => {
    // console.log(id);
    // update by id
  },
};
