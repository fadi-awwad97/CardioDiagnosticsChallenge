//Id, Type, Heart Rate(BPM), Date, PatientId

const mongoose = require("mongoose");

var eventRecSchema = new mongoose.Schema({
    id: {
        type: String,
        required : true,
        unique:true
    },
    Type : {
        type: String,
    },
    HeartRate : {
        type: Number
    },
    Date : {
        type: String
    },
    PatientId : {
        type: mongoose.Schema.Types.ObjectId, ref: 'patientRec'
    }
});


module.exports = EventRec = mongoose.model("eventRec", eventRecSchema);