import { clerkClient } from "@clerk/express";
import { v2 as cloudinary } from "cloudinary";
import Course from "../models/Course.js";
import Purchase from "../models/Purchase.js";
import User from "../models/User.js"

export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });
    res.json({ success: true, message: "You can publish a course now" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const addCourse = async (req, res) => {
  try {
    

    const { courseData } = req.body;
    const imageFile = req.file;
    const educatorId = req.auth?.userId;

    if (!educatorId) {
      return res.json({ success: false, message: "Educator ID is missing!" });
    }

    if (!imageFile) {
      return res.json({ success: false, message: "Thumbnail not attached" });
    }

    const parsedCourseData =
      typeof courseData === "string" ? JSON.parse(courseData) : courseData;
    parsedCourseData.educator = educatorId;

    //   console.log("Parsed Course Data:", parsedCourseData);

    const newCourse = await Course.create(parsedCourseData);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    newCourse.courseThumbnail = imageUpload.secure_url;
    await newCourse.save();

    res.json({ success: true, message: "Course added" });
  } catch (err) {
    //   console.error("Error adding course:", err);
    res.json({ success: false, message: err.message });
  }
};

export const getEducatorCourses = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    res.json({ success: true, courses });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const educatorDashboardData = async (req, res) => {
  try {
    const educator = res.auth.userId;
    const courses = await Course.find({ educator });
    const totalCourses = courses.length;
    const courseIds = courses.map((course) => course._id);
    //total earnings from purchases
    const purchases = await Purchase.find({
      courseId:{$in:courseIds},
      status:'completed'
    });
    const totalEarnings=purchases.reduce((sum,purchase)=>sum+purchase.amount,0);

    //collect unique enrolledStudents with their course titles;
    const enrolledStudentsData=[];
    for(const course of courses){
      const students=await User.find({
        _id:{$in:course.enrolledStudents}
      },'name imageUrl');

      students.forEach((student)=>{
        enrolledStudentsData.push({
          courseTitle:course.courseTitle,
          student
        })
      })
    }
    res.json({success:true,dashboardData:{
      totalCourses,totalEarnings,enrolledStudentsData
    }})
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const getEnrolledStudentsData=async(req,res)=>{
  try {
    const educator = res.auth.userId;
    const courses = await Course.find({ educator });
    const courseIds = courses.map((course) => course._id);
    const purchases=await Purchase.find({
      courseId:{$in:courseIds},
      status:'completed'
    }).populate('userId','name imageUrl').populate('courseId',courseTitle);

    const enrolledStudents=purchases.map(purchase=>({
      student:purchase.userId,
      courseTitle:purchase.courseId.courseTitle,
      purchaseData:purchase.createdAt
    }))
    res.json({success:true,enrolledStudents})
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
}
