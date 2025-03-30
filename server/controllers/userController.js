import Stripe from "stripe";
import Course from "../models/Course.js";
import Purchase from "../models/Purchase.js";
import User from "../models/User.js";

//get user
export const getUserData=async(req,res)=>{
    try{
        const userId=req.auth.userId;
        const user=await User.findById(userId);
        if(!user){
            return res.json({success:false,messgae:"User Not Found!!"});
        }
        res.json({success:true,user});
    }catch(err){
        res.json({success:false,messgae:err.message});
    }
}

//Users enrolled course with lecture links


export const userEnrolledCourses=async(req,res)=>{
    try{
        const userId=req.auth.userId;
        const userData=await User.findById(userId).populate('enrolledoCourses');
        res.json({success:true,enrolledoCourses:userData.enrolledoCourses});

    }catch(err){
        res.json({success:false,message:err.message});
    }
}

//Purchase course
export const purchaseCourse=async(req,res)=>{
    try{
        const{courseId}=req.body;
        const{origin}=req.headers;
        const userId=req.auth.userId;
        const userData=await User.findById(userId);
        const courseData=await Course.findById(courseId);
        if(!userData || !courseData){
            return res.json({success:false,message:"Data not found"});
        }
        const purchaseData={
            courseId:courseData._id,
            userId,
            amount:(courseData.coursePrice-courseData.discount*courseData.coursePrice/100).toFixed(2),
        }
        const newPurchase=await Purchase.create(purchaseData);
        
        const stripeInstance=new Stripe(process.env.STRIPE_SECRET_KEY);
        const currency=process.env.CURRENCY.toLowerCase();

        //line items fro stripe
        const line_items=[{
            price_data:{
                currency,
                product_data:{
                    name:courseData.courseTitle
                },
                unit_amount:Math.floor(newPurchase.amount)*100,
            },
            quantity:1
        }]

        const session=await stripeInstance.checkout.sessions.create({
            success_url:`${origin}/loading/my-enrollments`,
            cancel_url:`${origin}/`,
            line_items:line_items,
            mode:'payment',
            metadata:{
                purchaseId:newPurchase._id.toString(),
            }
        })
        res.json({success:true,session_url:session.url});
    }catch(err){
        res.json({success:false,message:err.message});
    }
}