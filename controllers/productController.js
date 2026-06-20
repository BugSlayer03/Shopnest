import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'

const addProduct = async (req,res) => {
    try {
        const {name, category, price} = req.body
        const image1 = req.file

        const images = [image1].filter((item)=>item!==undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path , {resource_type:'image'});

                return result.secure_url
            })
        )

        const productData = {
            name,
            category,
            price : Number(price),
            image : imagesUrl
        }

        const product = new productModel(productData)

        console.log(name,category,price)
        console.log(images)

        await product.save()

        res.json({success:true , message:"Product added"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const listProduct = async (req,res) => {
    try {
        const products = await productModel.find({

        })

        res.json({success:true, products})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const removeProduct = async (req,res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message: "Product removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const singleProductInfo = async (req,res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true, product})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {addProduct, listProduct, removeProduct, singleProductInfo}