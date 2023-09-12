const express = require("express");
const cors = require('cors');
const connection = require("./dbConnection");
const routes = require("./routes");
const app = express();

app.use(express.json()); //convert string into json
connection();
app.use(cors("/cars", routes));
app.use("/cars", routes);
const port = 9000;
app.listen(port, () => {
  console.log(`the port is listening at ${port}`);
});















//----------------------get api--------------------
// app.get("/fetch", async (req, resp) => {
//     let data = await user.find();
//     resp.send(data);
// })

