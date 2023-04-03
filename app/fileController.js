const { rejects } = require("assert");
const formidable = require("formidable");
const fs = require("fs");
const { resolve } = require("path");
const jsonController = require("./jsonController");
module.exports = {
  add: async (req, res) => {
    // add

    const form = formidable({
      multiples: true,
      uploadDir: __dirname + "/uploads",
      keepExtensions: true,
    });

    return new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          reject(err.message);
        } else {
          const { path } = files.file;
          const dir = fields.directory;
          filename = path.split("\\").at(-1);
          newDir = __dirname + "/uploads/" + dir;
          try {
            if (!fs.existsSync(newDir)) {
              fs.mkdirSync(newDir);
            }
            fs.renameSync(path, newDir + "/" + filename);
          } catch (error) {
            console.log(error);
          }
          resolve({ dir: newDir, filename: filename });
        }
      });
    });
  },
  get: (id) => {
    //get one by id
  },
  getall: () => {
    //get all
  },
  delete: (id) => {
    // delete by id
  },
  update: (id) => {
    // update by id
  },
};
