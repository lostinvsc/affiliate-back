const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    id:Number,
    name:String,
    link:String,
    image:String,
    new_price:String,
    category:String,
    image:String,
    tag:[],
})

const Product = mongoose.model('Product',productSchema);
module.exports=Product;