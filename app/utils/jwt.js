const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  createToken: async (user, time) => {
    let token = await jwt.sign(
      {
        user,
      },
      process.env.TOKEN_KEY, // powinno być w .env
      {
        expiresIn: time, // "1m", "1d", "24h"
      }
    );
    return token;
  },

  verifyToken: async (token) => {
    try {
      let decoded = await jwt.verify(token, process.env.TOKEN_KEY);
      return decoded.user;
    } catch (ex) {
      return { message: ex.message };
    }
  },
};
