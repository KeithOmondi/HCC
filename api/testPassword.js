const bcrypt = require("bcryptjs");

const enteredPassword = "Admin1234"; // Your input password
const hashedPassword = "$2a$10$psqZvW6q9Cno4Y5H/YVQ/O.cMLp.ymjF3DWIa7XGJwKaisxgOeJxW"; // Hashed password from DB

bcrypt.compare(enteredPassword, hashedPassword).then((match) => {
  console.log("Password match:", match);
});
