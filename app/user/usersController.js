const { encryptPass } = require("../utils/bcrypt");
const bcrypt = require("../utils/bcrypt");
const jwt = require("../utils/jwt");
const { User } = require("../model/model");
const users = new Array();
const confirmedUsers = new Array();
module.exports = {
  register: async (res, data) => {
    dataComplete = Object.values(data).length === 5 ? true : false;
    Object.values(data).forEach((e) => {
      if (!e) {
        dataComplete = false;
      }
    });
    if (dataComplete) {
      encryptedPass = await bcrypt.encryptPass(data.password);
      let id = users.length > 0 ? users.at(-1).id + 1 : 1;

      const exists = users.find((e) => data.email === e.email);
      res.setHeader("Content-Type", "application/json");
      if (!exists) {
        const user = new User(
          id,
          data.username,
          data.name,
          data.lastName,
          data.email,
          encryptedPass
        );
        users.push(user);
        const token = await jwt.createToken(
          { id: user.id, login: user.email },
          "1h"
        );

        res.statusCode = 201;

        res.end(
          JSON.stringify({
            message: `Open link below to confirm your account http://10.0.2.2:3000/api/users/confirm/${token} Attention: This link is valid for 1 hour `,
          })
        );
      } else {
        res.statusCode = 400;
        res.end(
          JSON.stringify({ message: "User with this email already exists" })
        );
      }
    } else {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: "Data is not correct" }));
    }
  },
  confirm: async (res, token) => {
    // console.log(token);
    const userFromToken = await jwt.verifyToken(token);

    const user = users.find((e) => e.id === userFromToken.id);

    res.setHeader("Content-Type", "application/json");
    if (user) {
      user.setConfirmed();

      confirmedUsers.push(user);
      res.end("Account confirmed");
    } else {
      res.statusCode = 404;
      res.end("Wrong or expired token");
    }
  },
  login: async (res, data) => {
    // console.log(data);
    const user = confirmedUsers.find((e) => e.email === data.email);
    res.setHeader("Content-Type", "application/json");
    if (user) {
      // console.log(user.password, await bcrypt.encryptPass(data.password));
      if (await bcrypt.decryptPass(data.password, user.password)) {
        const token = await jwt.createToken(data, "1h");
        res.setHeader("Authorization", "Bearer " + token);
        res.end(JSON.stringify({ user: user, token: token }));
        console.log("logged succesfully");
      } else {
        res.statusCode = 400;
        res.end("Wrong password");
      }
    } else {
      res.statusCode = 400;
      res.end("User with this email does not exists or is not confirmed");
    }
  },
  get: async (res, token) => {
    const userFromToken = await jwt.verifyToken(token);
    const user = users.find((e) => e.email === userFromToken.email);

    if (user) {
      res.statusCode = 200;
      return JSON.stringify({
        username: user.username,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        profilePic: user.profilePic,
      });
    }
  },
  addProfilePic: async (res, token, photo) => {
    const userFromToken = await jwt.verifyToken(token);
    const user = users.find((e) => e.email === userFromToken.email);
    console.log(photo);
    if (user) {
      // console.log(photo);
      // user.setProfilePic(photo.getId());
      // res.statusCode = 200;
      // return JSON.stringify(user);
    } else {
      // res.statusCode = 404;
      // return "Wrong data";
    }
  },
  update: async (res, token, data) => {
    const userFromToken = await jwt.verifyToken(token);
    const user = users.find((e) => e.email === userFromToken.email);

    if (user) {
      if (data.name !== "") {
        user.setName(data.name);
      }
      if (data.lastName !== "") {
        user.setLastname(data.lastName);
      }
      if (data.password !== "") {
        encryptedPass = await bcrypt.encryptPass(data.password);
        user.setPassword(encryptedPass);
      }
      if (data.profilePic !== "") {
        user.setProfilePic(data.profilePic);
      }
      res.statusCode = 200;
      return JSON.stringify(user);
    } else {
      res.statusCode = 404;
      return "Wrong data";
    }
  },
  find: (email) => {
    const user = users.find((e) => e.email === email);
    if (user) {
      return JSON.stringify({
        user: user.username,
        profilePic: user.profilePic,
      });
    }
  },
};
