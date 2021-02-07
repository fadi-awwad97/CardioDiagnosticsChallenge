const router = require("express").Router();
const PatientRec = require("../models/patientRecModel");
const DeviceRec = require("../models/deviceRecModel");
const EventRec = require("../models/eventRecModel");

router.get("/getPatientData", async (req, res) => {
    const patient = await PatientRec.find({}).sort({ studyStartTime : 1,events : 1}).populate('events').populate('deviceId','-_id -id');
    console.log(patient);
    res.send(patient)
});


router.get("/getDeviceData", async (req, res) => {
    const device = await DeviceRec.find({});
    console.log(device);
    res.send(device)
});


router.get("/getEventData", async (req, res) => {
    const event = await EventRec.find({}).populate('PatientId','-events');
    console.log(event);
    res.send(event)
});

router.post("/addDevice", async (req, res) => {
    const deviceData= {
        id:'1133',
        serialNumber:'A5678'
    }

   
    const insertDevice = await DeviceRec.create(deviceData);
    if(!insertDevice){
      console.log(err);
    }
    else {
      console.log("device document inserted");
    //   res.send("true")
    } 
})

// router.post("/addPatient", async (req, res) => {
//     const patientData= {
//         id:'1',
//         name:'sami',
//         dateOfBirth:'15/05/1997',
//         studyStartTime:'20/10/2020',
//         studyEndTime:'30/10/2020',
//         deviceId:
//     }

//     console.log(patientData)
//     const insertPatient = await PatientRec.create(patientData);
//     if(!insertPatient){
//       console.log(err);
//     }
//     else {
//       console.log("patient document inserted");
//     //   res.send("true")
//     } 
// })

module.exports = router ;