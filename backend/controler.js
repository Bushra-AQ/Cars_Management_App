const car = require("./schema");
//-------------------------------controller to fetch cars------------------------------------
exports.fetchCars = async (req, resp) => {
  try {
    const data = await car.find();
    resp.send({ data, statusCode: 200 });
  } catch (error) {
    resp.status(404).send("Error fetching the cars", error);
  }
};


//-------------------------------controller to fetch cars by id-------------------------------
exports.fetchCarsById = async (req, resp) => {
    try{
        const _id = req.params.id;
        // console.log(_id);
        let data = await car.findById(req.params);
        resp.send(data);
       
       }
    catch(error)
    {
        resp.status(404).send("Error fetching the cars", error);
    }
    },
   

//-------------------------------controller to insert cars------------------------------------

exports.insertCars = async (req, resp) => {
  try {
    let data = new car(req.body);
    const result = await data.save();
    resp.send(result);
  } catch (error) {
    resp.status(404).send("Error inserting the cars", error);
    // console.error("Error fetching cars:", error);
  }
};

//-------------------------------controller to update cars------------------------------------

exports.updateCars = async (req, resp) => {
  try {
    console.log(req.params);
    let data = await car.updateOne(req.params, { $set: req.body });
    resp.send("Updated Successful");
    console.log(data)
  } catch (error) {
    res.status(404).send("Error updating the cars", error);
  }
};

//-------------------------------controller to delete cars------------------------------------

exports.deleteCars = async (req, resp) => {
  try {
    let data = await car.deleteOne(req.params);
    resp.send("Deleted Successful");
  } catch (error) {
    res.status(404).send("Error deleting the cars", error);
  }
};

