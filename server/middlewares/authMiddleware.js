import { clerkClient } from "@clerk/express";

export const protectEducator = async (req, res, next) => {
    try {

        // Extract Clerk user ID
        const userId = req.auth?.userId || req.headers["x-clerk-user-id"];

        
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized - User ID missing!" });
        }

        const response = await clerkClient.users.getUser(userId);

        if (response.publicMetadata.role !== "educator") {
            return res.status(403).json({ success: false, message: "Unauthorized access!! " });
        }
        
        req.auth = { userId }; // Ensure userId is attached to req.auth
        next();

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
