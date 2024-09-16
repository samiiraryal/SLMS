// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';
// import { Bar } from 'react-chartjs-2';
// import './studentProgress.css';

// // StudentDetail Component
// const StudentDetail = ({ students:}) => {
//   const { id } = useParams();
//   const student = students[id];

//   if (!student) {
//     return <div>Student not found</div>;
//   }

//   const data = {
//     labels: ['Attendance', 'Lab Report'],
//     datasets: [
//       {
//         label: 'Student Performance',
//         data: [student.attendance, student.labReport],
//         backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
//       },
//     ],
//   };

//   return (
//     <div className="student-detail">
//       <h2>{student.name}</h2>
//       <p>Attendance: {student.attendance}%</p>
//       <p>Lab Report: {student.labReport}/10</p>
//       <Bar data={data} />
//       <Link className="back-link" to="/">Back to list</Link>
//     </div>
//   );
// };

// // App Component
// const App = () => {
//   const [students, setStudents] = useState([
//     { name: 'Samir Aryal', attendance: 90, labReport: 8 },
//     { name: 'Sandesh Gwachha', attendance: 75, labReport: 9 },
//     { name: 'Rashik Joshi', attendance: 85, labReport: 7 },
//     { name: 'Prijina Karmacharya', attendance: 95, labReport: 10 },
//   ]);

//   const sortStudents = (type: any) => {
//     const sorted = [...students].sort((a, b) => {
//       if (type === 'name') {
//         return a.name.localeCompare(b.name);
//       } else {
//         return b.attendance - a.attendance;
//       }
//     });
//     setStudents(sorted);
//   };

//   return (
//     <Router>
//       <div className="App">
//         <h1>Student Progress</h1>
//         <Switch>
//           <Route exact path="/">
//             <div className="controls">
//               <button onClick={() => sortStudents('name')}>Sort by Name</button>
//               <button onClick={() => sortStudents('attendance')}>Sort by Attendance</button>
//             </div>
//             <ul className="student-list">
//               {students.map((student, index) => (
//                 <li key={index} className="student-item">
//                   <Link to={`/student/${index}`}>{index + 1}. {student.name}</Link>
//                 </li>
//               ))}
//             </ul>
//           </Route>
//           <Route path="/student/:id" render={(props) => <StudentDetail {...props} students={students} />} />
//         </Switch>
//       </div>
//     </Router>
//   );
// };

// export default App;
