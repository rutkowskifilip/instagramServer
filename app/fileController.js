const formidable = require("formidable");
const fs = require("fs");
const jsonController = require("./jsonController");
module.exports = {
  add: (req, res) => {
    const form = formidable({
      multiples: true,
      uploadDir: __dirname + "/uploads",
      keepExtensions: true,
    });
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 201;
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return err;
      } else {
        const dir = fields.directory;
        newDir = __dirname + "/uploads/" + dir;
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

          res.end(jsonController.add(photos));
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

          res.end(jsonController.add(photos));
        }
      }
    });
  },

  delete: (id) => {
    // delete by id
    console.log(id);
    const image = jsonController.delete(id);
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
    console.log(id);
    // update by id
  },
};
