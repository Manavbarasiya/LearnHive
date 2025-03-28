import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [allCourses, setAllCourses] = useState([]);
  const[isEducator,setIsEducator]=useState(true);
  const[enrolledCourses,setEnrolledCourses]=useState([]);
  const navigate = useNavigate();

  const fetchAllCourse = async () => {
    setAllCourses(dummyCourses);
  };

  useEffect(() => {
    fetchAllCourse();
    fetchUserEnrolledCourses();
  }, []);

  const calculateRating = (course) => {
    if (!course.courseRatings || course.courseRatings.length === 0) {
      return 0;
    }
    let total = 0;
    course.courseRatings.forEach((rating) => {
        // console.log(rating);
      total += rating.rating;
    });
    return (total / course.courseRatings.length).toFixed(1); // Round to 1 decimal place
  };

  const calculateChapterTime=(chapter)=>{
    let time=0;
    chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration);
    return humanizeDuration(time*60*1000,{units:['h','m']})
  }

  const calculateCourseDuration=(course)=>{
    let time=0;
    course.courseContent.map((chapter)=>chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration))
    return humanizeDuration(time*60*1000,{units:['h','m']})
  }

  const calculateNoOfLectures=(course)=>{
    let totalLectures=0;
    course.courseContent.forEach(chapter=>{
        if(Array.isArray(chapter.chapterContent)){
            totalLectures+=chapter.chapterContent.length
        }
    });
    return totalLectures;
  }

  const fetchUserEnrolledCourses=()=>{
    setEnrolledCourses(dummyCourses)
  }

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateCourseDuration,
    calculateNoOfLectures,
    calculateChapterTime,
    fetchUserEnrolledCourses,
    enrolledCourses
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};