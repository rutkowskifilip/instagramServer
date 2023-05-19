const { encryptPass } = require("./bcrypt");
const bcrypt = require("./bcrypt");
const jwt = require("./jwt");
const { User } = require("./model");
const users = new Array();
module.exports = {
  register: async (res, data) => {
    console.log(Object.values(data));
    dataComplete = Object.values(data).length === 4 ? true : false;
    Object.values(data).forEach((e) => {
      if (!e) {
        dataComplete = false;
      }
    });
    if (dataComplete) {
      encryptedPass = await bcrypt.encryptPass(data.password);
      let id = users.length > 0 ? users.at(-1).id + 1 : 1;

      console.log(id);
      const user = new User(
        id,
        data.name,
        data.lastName,
        data.email,
        encryptedPass
      );
      const token = await jwt.createToken(
        { id: user.id, login: user.email },
        "1h"
      );
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.end(
        `Open link below to confirm your account http://localhost:3000/api/users/confirm/${token} Attention: This link is valid for 1 hour `
      );
    } else {
      res.statusCode = 404;
      res.end("Data is not correct");
    }
  },
};
