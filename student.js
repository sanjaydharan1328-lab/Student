
const mongoose = require("mongoose");

// Student Schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

// Create Student Model
const Student = mongoose.model("Student", studentSchema);

// Export Model
module.exports = Student;
