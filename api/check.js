const bcrypt = require("bcryptjs");
const Admin = require("./model/admin"); // Adjust path if needed
const mongoose = require("mongoose");

const updatePassword = async () => {
  await mongoose.connect("mongodb+srv://kdomondi1:omondi.@cluster0.iilch.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const password = "Admin@1234";
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await Admin.updateOne({ email: "kd.omondi1@gmail.com" }, { password: hashedPassword });

  console.log("Password updated successfully!");
  mongoose.connection.close();
};

updatePassword();
