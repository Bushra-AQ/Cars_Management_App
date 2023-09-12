const mongoose = require("mongoose");
const carSchema = mongoose.Schema(
  {
    name:
    {type :String,
    required : true
    },
    type:
    {type :String,
    required : true
    },
    year:
    {type :Number,
    required : true
    },
    mileage:
    {type :Number,
    required : true
    },
  },
  { timestamps: true }
);

const car = mongoose.model("cars", carSchema);

module.exports = car;
