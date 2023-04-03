class Image {
  constructor(url, originalName) {
    this.id = Date.now();
    this.album = url.split("/").at(-1);
    this.originalName = originalName;
    this.url = url;
    this.lastChange = "orignal";
    this.history = [{ status: "original", lastModifiedDate: Date.now() }];
  }
}

module.exports = { Image };
