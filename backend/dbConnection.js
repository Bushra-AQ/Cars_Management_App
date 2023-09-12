const mongoose = require("mongoose");

function connection() {
  try {
    mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.pcpltwt.mongodb.net/manage-cars-info",
      {}
    );
    console.log(" Connection Build");
  } catch (error) {
    console.log("Error: Connection not build");
  }
}
module.exports = connection;
