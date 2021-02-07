const mongoose = require("mongoose");

var patientRecSchema = new mongoose.Schema({

    name : {
        type: String,
    },
    dateOfBirth : {
        type: String
    },
    studyStartTime : {
        type: String
    },
    studyEndTime : {
        type: String
    },
    deviceId : {
        type: mongoose.Schema.Types.ObjectId, ref: 'deviceRec'
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'eventRec'
    }]
});


module.exports = PatientRec = mongoose.model("patientRec", patientRecSchema);