const { Image } = require("../model/model");
const tagsController = require("../tags/tagsController");
let images = new Array();

module.exports = {
  add: (arr) => {
    if (arr.length > 1) {
      const response = [];
      arr.forEach((e) => {
        const id = images.at(-1).id + 1;
        const image = new Image(id, e.dir, e.filename);
        images.push(image);
        response.push(image);
      });
      return JSON.stringify(response);
    } else {
      const id = images.length > 0 ? images.at(-1).id + 1 : 1;
      const image = new Image(id, arr[0].dir, arr[0].filename);
      images.push(image);
      return JSON.stringify(image);
    }

    // add
  },
  get: (id) => {
    console.log(id);
    let image = "";
    if (parseInt(id) === 0) {
      image = images.at(-1);
    } else {
      image = images.find((e) => e.id === parseInt(id));
    }

    if (image) {
      return JSON.stringify(image);
    } else {
      return JSON.stringify({ message: `There's no file with id ${id}` });
    }
    //get one by id
  },
  getall: () => {
    return JSON.stringify(images);
  },
  getByAlbum: (name) => {
    console.log(name);
    images.forEach((e) => {
      console.log(e.album, name);
    });
    files = images.filter((e) => e.album === name);

    return JSON.stringify(files);
  },
  delete: (id) => {
    const image = images.find((e) => e.id === parseInt(id));

    images = images.filter((e) => {
      return e.id !== parseInt(id);
    });
    if (image) {
      return image;
    } else {
      return 0;
    }
    // delete by id
  },
  update: (id, type) => {
    const image = images.find((e) => e.id === parseInt(id));
    image.setHistory(type);
    return JSON.stringify(image);
    // update by id
  },
  updateTags: (res, data) => {
    const image = images.find((e) => e.id === data.id);
    if (image) {
      data.tags.forEach((t) => {
        const tag = tagsController.getOneByName(t);
        image.setTags(JSON.parse(tag));
      });

      return JSON.stringify(image);
    } else {
      res.statusCode = 404;
      return JSON.stringify({ message: `There's no file with id ${data.id}` });
    }
  },
  getTags: (res, id) => {
    const image = images.find((e) => e.id === parseInt(id));
    if (image) {
      return JSON.stringify({ id: id, tags: image.tags });
    } else {
      res.statusCode = 404;
      return JSON.stringify({ message: `There's no file with id ${id}` });
    }
  },
};
