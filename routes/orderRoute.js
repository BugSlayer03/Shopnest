import express from 'express'

import userAuth from "../middleware/userAuth.js";
import adminAuth from "../middleware/adminAuth.js";

import { placeOrder, getUserOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post(
    "/place",
    userAuth,
    placeOrder
);

orderRouter.get(
    "/userorders",
    userAuth,
    getUserOrders
);

orderRouter.get(
    "/allorders",
    adminAuth,
    getAllOrders
);

orderRouter.post(
    "/status",
    adminAuth,
    updateOrderStatus
);

export default orderRouter;