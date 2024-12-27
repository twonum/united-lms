import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
    createCheckoutSession,
    getAllPurchasedCourse,
    getCourseDetailWithPurchaseStatus,
    stripeWebhook,
} from "../controllers/coursePurchase.controller.js";

const router = express.Router();

// Middleware to validate courseId in routes
const validateCourseId = (req, res, next) => {
    const { courseId } = req.params;
    if (!courseId || courseId.length !== 24) {
        return res.status(400).json({ message: "Invalid course ID" });
    }
    next();
};

// Routes
router
    .route("/checkout/create-checkout-session")
    .post(isAuthenticated, createCheckoutSession);

router
    .route("/webhook")
    .post(express.raw({ type: "application/json" }), stripeWebhook);

router
    .route("/course/:courseId/detail-with-status")
    .get(isAuthenticated, validateCourseId, getCourseDetailWithPurchaseStatus);

router.route("/").get(isAuthenticated, getAllPurchasedCourse);

export default router;
