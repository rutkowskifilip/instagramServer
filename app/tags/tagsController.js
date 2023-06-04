const { Tag } = require("../model/model");
const popularTags = require("../utils/popularTags");
const tags = new Array();
const tagsRaw = new Array();
popularTags.forEach((e) => {
  const tag = new Tag(tags.length + 1, e.name, e.popularity);
  tags.push(tag);
  tagsRaw.push(tag.name);
});
module.exports = {
  add: (res, data) => {
    if (tags.filter((e) => e.name === data.name).length === 0) {
      const tag = new Tag(tags.length + 1, data.name, data.popularity);
      tags.push(tag);
      tagsRaw.push(tag.name);
      return JSON.stringify(tag);
    } else {
      res.statusCode = 404;
      return JSON.stringify({ message: `Tag ${data.name} already exists` });
    }
  },

  getAll: () => {
    return JSON.stringify(tags);
  },
  getAllRaw: () => {
    return JSON.stringify(tagsRaw);
  },
  getOneById: (id) => {
    const tag = tags.find((e) => e.id === parseInt(id));
    return JSON.stringify(tag);
  },
  getOneByName: (name) => {
    const tag = tags.find((e) => e.name === name);

    return JSON.stringify(tag);
  },
};
