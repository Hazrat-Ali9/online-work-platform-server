"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_route_1 = require("../modules/admin/admin.route");
const auth_route_1 = require("../modules/auth/auth.route");
const buyer_route_1 = require("../modules/buyer/buyer.route");
const category_route_1 = require("../modules/category/category.route");
const order_route_1 = require("../modules/order/order.route");
const profile_route_1 = require("../modules/profile/profile.route");
const seller_route_1 = require("../modules/seller/seller.route");
const task_route_1 = require("../modules/task/task.route");
const taskReview_route_1 = require("../modules/taskReview/taskReview.route");
const testimonials_route_1 = require("../modules/testimonials/testimonials.route");
const users_route_1 = require("../modules/users/users.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/users',
        route: users_route_1.userRoutes,
    },
    {
        path: '/profile',
        route: profile_route_1.profileRoutes,
    },
    {
        path: '/sellers',
        route: seller_route_1.sellerRoutes,
    },
    {
        path: '/buyers',
        route: buyer_route_1.buyerRoutes,
    },
    {
        path: '/admins',
        route: admin_route_1.adminRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.authRoutes,
    },
    {
        path: '/categories',
        route: category_route_1.categoryRoutes,
    },
    {
        path: '/tasks',
        route: task_route_1.taskRoutes,
    },
    {
        path: '/task-reviews',
        route: taskReview_route_1.taskReviewRoutes,
    },
    {
        path: '/orders',
        route: order_route_1.orderRoutes,
    },
    {
        path: '/testimonials',
        route: testimonials_route_1.testimonialRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
