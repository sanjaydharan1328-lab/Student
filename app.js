import React, { useState, useEffect } from "react";

function App() {
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState({
        name: "",
        rollNo: "",
        department: "",
        email: "",
        age: ""
    });

    // Fetch Students
    const getStudents = async () => {
        const response = await fetch("http://localhost:5000/students");
        const data = await response.json();
        setStudents(data);
    };

    useEffect(() => {
        getStudents();
    }, []);

    // Handle Input
    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    };

    // Add Student
    const addStudent = async (e) => {
        e.preventDefault();

        await fetch("http://localhost:5000/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        setStudent({
            name: "",
            rollNo: "",
            department: "",
            email: "",
            age: ""
        });

        getStudents();
    };

    // Delete Student
    const deleteStudent = async (id) => {
        await fetch(`http://localhost:5000/students/${id}`, {
            method: "DELETE"
        });

        getStudents();
    };

    return (
        <div>
            <h1>Student Management System</h1>

            <form onSubmit={addStudent}>
                <input
                    name="name"
                    placeholder="Student Name"
                    value={student.name}
                    onChange={handleChange}
                    required
                />

                <input
                    name="rollNo"
                    placeholder="Roll Number"
                    value={student.rollNo}
                    onChange={handleChange}
                    required
                />

                <input
                    name="department"
                    placeholder="Department"
                    value={student.department}
                    onChange={handleChange}
                    required
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={student.email}
                    onChange={handleChange}
                    required
                />

                <input
                    name="age"
                    type="number"
                    placeholder="Age"
                    value={student.age}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Add Student</button>
            </form>

            <h2>Student Details</h2>

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>Department</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {students.map((s) => (
                        <tr key={s._id}>
                            <td>{s.name}</td>
                            <td>{s.rollNo}</td>
                            <td>{s.department}</td>
                            <td>{s.email}</td>
                            <td>{s.age}</td>
                            <td>
                                <button onClick={() => deleteStudent(s._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
                      
