import express from 'express';
import { adminRoutes } from '../modules/admin/admin.route';
import { authRoutes } from '../modules/auth/auth.route';
import { buyerRoutes } from '../modules/buyer/buyer.route';
import { categoryRoutes } from '../modules/category/category.route';
import { orderRoutes } from '../modules/order/order.route';
import { profileRoutes } from '../modules/profile/profile.route';
import { sellerRoutes } from '../modules/seller/seller.route';
import { taskRoutes } from '../modules/task/task.route';
import { taskReviewRoutes } from '../modules/taskReview/taskReview.route';
import { testimonialRoutes } from '../modules/testimonials/testimonials.route';
import { userRoutes } from '../modules/users/users.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/profile',
    route: profileRoutes,
  },
  {
    path: '/sellers',
    route: sellerRoutes,
  },
  {
    path: '/buyers',
    route: buyerRoutes,
  },
  {
    path: '/admins',
    route: adminRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/tasks',
    route: taskRoutes,
  },
  {
    path: '/task-reviews',
    route: taskReviewRoutes,
  },
  {
    path: '/orders',
    route: orderRoutes,
  },
  {
    path: '/testimonials',
    route: testimonialRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
