class Image {
  constructor(album, originalName) {
    this.id = Date.now();
    this.album = album;
    this.originalName = originalName;
    this.lastChange = "orignal";
    this.history = [{ status: "original", lastModifiedDate: Date.now() }];
  }
}

module.exports = { Image };
