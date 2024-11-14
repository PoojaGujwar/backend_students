const express = require("express");
const cors = require("cors");
const app = express();

const { initializeDatabase } = require("./db/db.connection");
const { Students } = require("./models/students.model");

const newStudents ={
  name: "Naman",
  age: 15,
  gender: "Male",
  marks: 90,
  attendance: 90,
  grade: "A",
}
async function addToDatabase(newStudents){
try{
  const st = new Students(newStudents)
  const saveSt = await st.save()
  console.log(saveSt)

}catch(error){
  console.log("Not added",error)
}
}
//addToDatabase(newStudents)

app.use(cors());
app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/students", async (req, res) => {
  try {
    const students = await Students.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/students", async (req, res) => {
  const { name, age, grade,gender } = req.body;

  try {
    const student = new Students(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/students/:_id", async (req, res) => {
  const studentId = req.params._id;
  const updatedStudentData = req.body;

  try {
    const updatedStudent = await Students.findByIdAndUpdate(
      studentId,
      updatedStudentData,
      { new: true },
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/students/:_id", async (req, res) => {
  const studentId = req.params._id;

  try {
    const deletedStudent = await Students.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res
      .status(200)
      .json({
        message: "Student deleted successfully",
        student: deletedStudent,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
