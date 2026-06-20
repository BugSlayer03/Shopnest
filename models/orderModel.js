import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    items: {
        type: Array,
        required: true
    },

    total: {
        type: Number,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Ordered"
    },

    date: {
        type: Date,
        required: true
    }
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel