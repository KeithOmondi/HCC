const mongoose = require("mongoose");// Adjust the path to your Admin model
const Admin = require("./model/admin");

// MongoDB Connection URI (update with your actual database URI)
const mongoURI = "mongodb+srv://denniskeith62:keith.@cluster0.w7yid.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Fetch and display all admins
const fetchAdmins = async () => {
  try {
    const admins = await Admin.find();
    console.log("Admin Records:");
    console.log(JSON.stringify(admins, null, 2)); // Pretty print JSON
  } catch (error) {
    console.error("Error fetching admins:", error);
  } finally {
    mongoose.connection.close(); // Close connection after fetching
  }
};

// Run the function
fetchAdmins();

