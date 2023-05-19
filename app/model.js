class Image {
  constructor(id, url, originalName) {
    this.id = id;
    this.album = url.split("/").at(-1);
    this.originalName = originalName;
    this.url = url + "/" + originalName;
    this.lastChange = "orignal";
    this.history = [{ status: "original", lastModifiedDate: Date.now() }];
    this.tags = [];
  }
  setHistory(update) {
    this.history.push({ status: update, lastModifiedDate: Date.now() });
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
class User {
  constructor(id, name, lastName, email, password) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.confirmed = false;
  }

  setConfirmed() {
    this.confirmed = true;
  }
}
module.exports = { Image, Tag, User };
