const mongoose = require("mongoose");
require("dotenv/config");
const app = require("./app.js");

// Database connection 
mongoose
  .connect(
    "mongodb+srv://avinas:avinas@cluster0.bpilnp1.mongodb.net/abinas?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB connection is successful");
  })
  .catch((error) => {
    console.error("Error connecting to the database: ", error.message);
  });

// Server 
const port = 5000;

app.listen(port, () => {
  console.log("App is running on port " + port);
});

process.on("unhandledRejection", (error) => {
  console.log("error here", error);
  mongoose.connection
    .close()
    .then(() => {
      process.exit(1);
    })
    .catch((error) => {
      console.error("Error closing Mongoose connection:", error.message);
      process.exit(1);
    });
});
