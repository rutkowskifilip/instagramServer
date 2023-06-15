const { Image } = require("../model/model");
const tagsController = require("../tags/tagsController");
let images = new Array();
let profileImages = new Array();
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
  addToProfile: (arr) => {
    if (arr.length > 1) {
      const response = [];
      arr.forEach((e) => {
        const id = profileImages.at(-1).id + 1;
        const image = new Image(id, e.dir, e.filename);
        profileImages.push(image);
        response.push(image);
      });
      return JSON.stringify(response);
    } else {
      const id = profileImages.length > 0 ? profileImages.at(-1).id + 1 : 1;
      const image = new Image(id, arr[0].dir, arr[0].filename);
      profileImages.push(image);

      return JSON.stringify(image);
    }
  },
  get: (id) => {
    let image = "";
    if (parseInt(id) === 0) {
      image = images.at(-1);
    } else {
      image = images.find((e) => e.id === parseInt(id));
    }

    if (image) {
      return image;
    } else {
      return JSON.stringify({ message: `There's no file with id ${id}` });
    }
    //get one by id
  },
  getProfilePic: (id) => {
    let image = "";
    if (parseInt(id) === 0) {
      image = profileImages.at(-1);
    } else {
      image = profileImages.find((e) => e.id === parseInt(id));
    }

    if (image) {
      return JSON.stringify(image);
    } else {
      return JSON.stringify({ message: `There's no file with id ${id}` });
    }
  },
  getall: () => {
    return JSON.stringify(images);
  },
  getByAlbum: (name) => {
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
  update: (id, type, newUrl) => {
    const image = images.find((e) => e.id === parseInt(id));
    image.setHistory(type);
    image.setLastChange(type);
    image.setUrl(newUrl);
    return JSON.stringify(image);
    // update by id
  },
  updateTags: (res, data) => {
    const image = images.find((e) => e.id === data.id);
    if (image) {
      data.tags.forEach((t) => {
        // const tag = tagsController.getOneByName(t);
        image.setTags({ name: t });
      });

      return JSON.stringify(image);
    } else {
      console.log("error");
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
  updateLocation: (res, data) => {
    const image = images.find((e) => e.id === data.id);

    if (image) {
      image.setLocation(data.location);
      return JSON.stringify(image);
    } else {
      console.log("error");
      res.statusCode = 404;
      return JSON.stringify({ message: `There's no file with id ${data.id}` });
    }
  },
};
