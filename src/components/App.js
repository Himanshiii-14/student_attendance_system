import React, { useState, useEffect } from "react";
import StudentForm from "./StudentForm";

function App() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    rollNumber: "",
    checkinTime: "",
    checkoutTime: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("students");
    if (data) {
      setStudents(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addStudent = () => {
    setStudents([...students, newStudent]);
    setNewStudent({
      name: "",
      rollNumber: "",
      checkinTime: "",
      checkoutTime: "",
    });
  };

  const removeStudent = (rollNumber) => {
    const updatedStudents = students.filter(
      (student) => student.rollNumber !== rollNumber
    );
    setStudents(updatedStudents);
  };

  const checkNumOfStudents = () => {
    const presentStudents = students.filter(
      (student) => student.checkoutTime === ""
    );
    return presentStudents.length;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Student Attendance System</h1>

        <StudentForm
          newStudent={newStudent}
          setNewStudent={setNewStudent}
          addStudent={addStudent}
        />

        <hr className="my-8" />

        <h2 className="text-xl font-bold mb-4">Present Students</h2>

        <div className="mb-4">
          <p className="font-bold">
            {checkNumOfStudents()} students are present in the school right now
          </p>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Roll Number</th>
              <th className="border px-4 py-2">Checkin Time</th>
              <th className="border px-4 py-2">Checkout Time</th>
              <th className="border px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.rollNumber}>
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.rollNumber}</td>
                <td className="border px-4 py-2">{student.checkinTime}</td>
                <td className="border px-4 py-2">{student.checkoutTime}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => removeStudent(student.rollNumber)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
