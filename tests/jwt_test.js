const jwt = require("jsonwebtoken");
require("dotenv").config();
const createToken = async () => {
  let token = await jwt.sign(
    {
      email: "aaa@test.com",
      anyData: "123",
    },
    process.env.TOKEN_KEY, // powinno być w .env
    {
      expiresIn: "30s", // "1m", "1d", "24h"
    }
  );
  console.log({ token: token });
};

const verifyToken = async (token) => {
  try {
    let decoded = await jwt.verify(token, process.env.TOKEN_KEY);
    console.log({ decoded: decoded });
  } catch (ex) {
    console.log({ message: ex.message });
  }
};

const processToken = async () => {
  //   await createToken();
  await verifyToken(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhYUB0ZXN0LmNvbSIsImFueURhdGEiOiIxMjMiLCJpYXQiOjE2ODQxMzcwNTQsImV4cCI6MTY4NDEzNzA4NH0.r7svKk_Efxfi034ttgdkTev5s5pvaDr3TE4K4zMcE3Q"
  );
};

processToken();
