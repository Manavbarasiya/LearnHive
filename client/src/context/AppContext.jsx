import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { getToken } = useAuth();
  const { user } = useUser();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/course/all");
      if (data.success) {
        setAllCourses(data.course);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  //fetch user data;
  const fetchUserData = async () => {

    if(user.publicMetadata.role==='educator'){
      setIsEducator(true);
    }
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + "/api/user/data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(data.success){
        setUserData(data.user);
      }else{
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

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

  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };
  //fetch user enrolled Courses
  const fetchUserEnrolledCourses =async () => {
    try{
      const token=await getToken();
      const{data}=await axios.get(backendUrl+'/api/user/enrolled-courses',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(data.success){
        setEnrolledCourses(data.enrolledoCourses.reverse());
      }else{
        toast.error(data.message);
      }
    }catch(err){
      toast.error(err.message);
    }
  };
  useEffect(() => {
    fetchAllCourses();
    
  }, []);

  const logToken = async () => {
    // console.log(await getToken());
  };
  useEffect(() => {
    if (user) {
      fetchUserData();
      logToken();
      fetchUserEnrolledCourses();
    }
  }, [user]);
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
    enrolledCourses,
    backendUrl,
    userData,
    setUserData,
    getToken,
    fetchAllCourses
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
