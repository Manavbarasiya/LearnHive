import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

const app=express();

app.use(cors());
app.use(express.json());
await connectDB();

app.get("/",(req,res)=>{
    res.send("API Worksujenfensning");
})

app.post("/clerk",clerkWebhooks);

const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on port no ${PORT}`)
})
//

