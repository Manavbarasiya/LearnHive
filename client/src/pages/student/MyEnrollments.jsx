import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";
import axios from "axios";
import { toast } from "react-toastify";

const MyEnrollments = () => {
  const {
    enrolledCourses,
    calculateCourseDuration,
    navigate,
    userData,
    fetchUserEnrolledCourses,
    backendUrl,
    getToken,
    calculateNoOfLectures,
  } = useContext(AppContext);

  // Hardcoded progressArray
  const [progressArray, setProgressArray] = useState([]);
  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const { data } = await axios.post(
            backendUrl + "/api/user/get-course-progress",
            { courseId: course._id },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          let totalLectures=calculateNoOfLectures(course);
          const lectureCompleted=data.progressData ?data.progressData.lectureCompleted.length:0;
          return {totalLectures,lectureCompleted};
        })
      );
      setProgressArray(tempProgressArray);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    if(userData){
      fetchUserEnrolledCourses();
    }
  },[userData]);
  useEffect(()=>{
    if(enrolledCourses.length>0){
      getCourseProgress();
    }
  },[enrolledCourses]);
  return (
    <>
      <div className="md:px-36 px-8 pt-10">
        <h1 className="text-2xl font-semibold text-gray-800">My Enrollments</h1>
        <table className="w-full mt-10 border-collapse">
          <thead className="bg-gray-50">
            <tr className="text-gray-900 text-sm text-left">
              <th className="px-4 py-3 font-semibold">Course</th>
              <th className="px-4 py-3 font-semibold">Duration</th>
              <th className="px-4 py-3 font-semibold">Completed</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {enrolledCourses && enrolledCourses.map((course, index) => {
              // Get progress for the current course
              const progress = progressArray[index];

              // Calculate progress percentage
              const progressPercent = progress
                ? (progress.lectureCompleted / progress.totalLectures) * 100
                : 0;

              return (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  {/* Course Column */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={course.courseThumbnail}
                        alt={course.courseTitle}
                        className="w-14 sm:w-24 md:w-28 rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          {course.courseTitle}
                        </p>
                        {/* Progress Bar */}
                        <div className="mt-2">
                          <Line
                            percent={progressPercent}
                            strokeWidth={2}
                            strokeColor="#3B82F6" // Blue color
                            trailWidth={2}
                            trailColor="#E5E7EB" // Gray color
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Duration Column */}
                  <td className="px-4 py-4 text-gray-700">
                    {calculateCourseDuration(course)}
                  </td>

                  {/* Completed Column */}
                  <td className="px-4 py-4 text-gray-700">
                    <div className="flex items-center gap-2">
                      {progress ? (
                        <>
                          <span className="font-medium">
                            {progress.lectureCompleted} /{" "}
                            {progress.totalLectures}
                          </span>
                          <span className="text-sm text-gray-500">
                            Lectures
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-gray-500">
                          No progress data
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="px-4 py-4">
                    <button
                      className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
                      onClick={() => navigate("/player/" + course._id)}
                    >
                      {progress
                        ? progress.lectureCompleted === progress.totalLectures
                          ? "Completed"
                          : "Ongoing"
                        : "No progress data"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default MyEnrollments;
