import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// const order = new orderModel({

//     userId: req.userId,

//     items: req.body.items,

//     total: req.body.total,

//     phone: req.body.phone,

//     address: req.body.address,

//     date: new Date()
// });

const placeOrder = async (req, res) => {

    try {

        const order = new orderModel({
            userId: req.userId,
            items: req.body.items,
            total: req.body.total,
            date: new Date(),
            phone: req.body.phone,
            address: req.body.address,
        });

        await order.save();

        res.json({
            success: true
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });
    }
};

const getUserOrders = async (req, res) => {

    try {

        const orders =
            await orderModel.find({
                userId: req.userId
            })

        res.json({
            success: true,
            orders
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });
    }
};

const getAllOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({}).sort({ date: -1 }).populate("userId", "name email");

        res.json({
            success: true,
            orders
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });
    }
};

const updateOrderStatus = async (req, res) => {

    try {

        const { orderId, status } = req.body;

        await orderModel.findByIdAndUpdate(
            orderId,
            { status }
        );

        res.json({
            success: true,
            message: "Status Updated"
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });
    }
}

export { placeOrder, getUserOrders, getAllOrders, updateOrderStatus };