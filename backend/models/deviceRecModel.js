const mongoose = require("mongoose");

var deviceRecSchema = new mongoose.Schema({
    id: {
        type: String,
        required : true,
        unique:true
    },
    serialNumber : {
        type: String,
    }

});


module.exports = DeviceRec = mongoose.model("deviceRec", deviceRecSchema);