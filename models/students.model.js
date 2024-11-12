const mongoose = require('mongoose')

const studentDetails = new mongoose.Schema({
    
registrationNumber:String,
studentId:Number,
studentName:String,
studentProfileImageUrl:String,
fatherOrGradian:String,
standard:String,
emergencyContanct:Number
})
const Students = mongoose.model("Students",studentDetails)
module.exports = {Students};