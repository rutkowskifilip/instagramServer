class Image {
  constructor(id, url, originalName) {
    this.id = id;
    this.album = url.split("/").at(-1);
    this.originalName = originalName;
    this.url = url;
    this.lastChange = "orignal";
    this.history = [{ status: "original", lastModifiedDate: Date.now() }];
    this.tags = [];
  }

  setTags(tag) {
    if (this.tags.filter((e) => e.name === tag.name).length === 0) {
      this.tags.push({ name: tag.name, popularity: tag.popularity });
    }
  }
}
class Tag {
  constructor(id, name, popularity) {
    this.id = id;
    this.name = name;
    this.popularity = popularity;
  }
}
module.exports = { Image, Tag };
