import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import "dotenv/config";
import express from "express";
import connectCloudinary from "./configs/cloudinary.js";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js";
import courseRouter from "./routes/courseRoute.js";
import educatorRouter from "./routes/educatorRoutes.js";
import userRouter from "./routes/userRouter.js";
const app=express();

app.use(cors());
app.use(clerkMiddleware());
// app.use();
await connectDB();
await connectCloudinary();

app.get("/",(req,res)=>{
    res.send("API Worksujenfensning"); 
})


app.post("/clerk",express.json(),clerkWebhooks);
app.use("/api/educator",express.json(),educatorRouter);
app.use("/api/course",express.json(),courseRouter);
app.use("/api/user",express.json(),userRouter);
app.post("/stripe",express.raw({type:'application/json'}),stripeWebhooks);


const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on port no ${PORT}`)
})
//

