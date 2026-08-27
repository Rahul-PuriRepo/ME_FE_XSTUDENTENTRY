import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [students, setStudents] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim() || !age || !grade) {
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      age,
      grade,
    };

    setStudents((currentStudents) => [...currentStudents, newStudent]);

    setName("");
    setAge("");
    setGrade("");
  };

  const handleClear = () => {
    setName("");
    setAge("");
    setGrade("");
  };

  const handleRemove = (id) => {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== id)
    );
  };

  return (
    <div className="app">
      <div className="student-card">
        <h1>Student Entry Form</h1>

        <p className="subtitle">
          Add students and review the list below.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-fields">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. MS Dhoni"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                placeholder="e.g. 14"
                value={age}
                onChange={(event) => setAge(event.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="grade">Grade</label>
              <select
                id="grade"
                name="grade"
                value={grade}
                onChange={(event) => setGrade(event.target.value)}
              >
                <option value="">Select grade</option>
                {Array.from({ length: 12 }, (_, index) => {
                  const value = String(index + 1);

                  return (
                    <option key={value} value={value}>
                      Class {value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="actions">
            <button type="submit" className="add-button">
              Add Student
            </button>

            <button
              type="button"
              className="clear-button"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </form>

        {students.length === 0 ? (
          <div className="empty-state">No students added yet.</div>
        ) : (
          <div className="student-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Grade</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>Class {student.grade}</td>
                    <td>
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => handleRemove(student.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
