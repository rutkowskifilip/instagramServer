const formidable = require("formidable");
const fs = require("fs");
module.exports = {
  add: (req, res) => {
    // add

    const form = formidable({
      multiples: true,
      uploadDir: __dirname + "/uploads",
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          status: "Fail",
          message: "There was an error parsing file",
          error: err,
        });
      } else {
        const { path } = files.file;
        const dir = fields.directory;
        console.log(files.file);
        // try {
        //   fs.renameSync(path, join(uploadDir, dir));
        // } catch (error) {
        //   console.log(error);
        // }
        return { fields, files };
      }
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
