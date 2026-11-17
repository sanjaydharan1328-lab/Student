
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Student Schema
const studentSchema = new mongoose.Schema({
    name: String,
    rollNo: String,
    department: String,
    email: String,
    age: Number
});

// Student Model
const Student = mongoose.model("Student", studentSchema);

// Add Student
app.post("/students", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.json({ message: "Student Added Successfully", student });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// View Students
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Student
app.put("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!student) {
            return res.status(404).json({ message: "Student Not Found" });
        }
        res.json({ message: "Student Updated", student });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Student
app.delete("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student Not Found" });
        }
        res.json({ message: "Student Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
