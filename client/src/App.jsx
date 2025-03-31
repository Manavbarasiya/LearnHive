import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import Loading from "./components/student/Loading";
import Navbar from "./components/student/Navbar";
import AddCourse from "./pages/educator/AddCourse";
import Dashboard from "./pages/educator/Dashboard";
import Educator from "./pages/educator/Educator";
import MyCourses from "./pages/educator/MyCourses";
import StudentsEnrolled from "./pages/educator/StudentsEnrolled";
import CourseDetails from "./pages/student/CourseDetails";
import CoursesList from "./pages/student/CoursesList";
import Home from "./pages/student/Home";
import MyEnrollments from "./pages/student/MyEnrollments";
import Player from "./pages/student/Player";
import Courses from "./components/educator/Courses"
import Resources from "./components/educator/Resources";
import Community from "./components/educator/Community";
import Support from "./components/educator/Support";
import "quill/dist/quill.snow.css";
import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  const isEducatorRoute=useMatch('/educator/*');
  return (
    <div className="text-default min-h-screen bg-white">
      <ToastContainer/>
      {!isEducatorRoute && <Navbar/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />
        <Route path="/educator" element={<Educator />}>
          <Route path="/educator" element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentsEnrolled />} />
        </Route>
        <Route path="/educator/courses" element={<Courses/>} />
        <Route path="/educator/resources" element={<Resources/>} />
        <Route path="/educator/community" element={<Community/>} />
        <Route path="/educator/support" element={<Support/>} />
      </Routes>
    </div>
  );
};

export default App;
