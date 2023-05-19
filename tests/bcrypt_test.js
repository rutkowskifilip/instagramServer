const pass = "moje tajne hasło";
const bcrypt = require("bcryptjs");
const encryptPass = async (password) => {
  let encryptedPassword = await bcrypt.hash(password, 10);
  console.log({ encryptedPassword: encryptedPassword });
};

encryptPass(pass);
const decryptPass = async (userpass, encrypted) => {
  let decrypted = await bcrypt.compare(userpass, encrypted);
  console.log(decrypted);
};

decryptPass(
  pass,
  "$2a$10$9vVN9nX3Os1off9hCAV24eW0T/C.NwL1FooOyLjU9BbDO/w1jBAxy"
);
