const { Image } = require("./model");
const images = new Array();
module.exports = {
  add: (dir, filename) => {
    const image = new Image(dir, filename);
    images.push(image);

    return JSON.stringify(image);
    // add
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
