require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

const Product = require('./Model/Product.js')

require('dotenv').config();
const port =process.env.PORT || 3000;
const app = express();
const frontend = process.env.FRONTEND || "http://localhost:10000"
const admin = process.env.ADMIN || "http://localhost:10001"
app.use(cors({
    origin: [frontend , admin],
    credentials: true
}));
app.use(bodyParser.json())
app.use(cookieParser())

const mongo_uri=process.env.MONGO_URI || "mongodb://localhost:27017/ecart"
mongoose.connect(mongo_uri)


app.post('/addproduct', async (req, res) => {
    try {
        let { name, link, new_price, category, image, tag1, tag2 } = req.body
        let oldp = await Product.find({})
        let id = 1;
        if (oldp.length > 0) {
            id = oldp.slice(-1)[0].id + 1;
        }
        let product = await Product.create({
            id: id,
            name: name,
            link: link,
            new_price: new_price,
            category: category,
            image: image,
            tag: ['all', tag1, tag2]
        })

        

        res.json({ status: true, message: "Sucessfully added product" })
    } catch (error) {
        console.log({ "error": error })
        res.json({ status: false, message: "Product not added" })
    }
})

app.put('/updateproduct', async (req, res) => {
    try {
        let { name, link, new_price, image, tag1, tag2, pro_id } = req.body

        let up_pro = await Product.findByIdAndUpdate(pro_id,
            {
                name: name,
                link: link,
                new_price: new_price,
                image: image,
                tag: ['all', tag1, tag2]
            })

        res.json({ status: true, message: "Sucessfully product update" })
    } catch (error) {
        console.log({ "error": error })
        res.json({ status: false, message: "Product not added" })
    }
})



app.get('/getlist', async (req, res) => {
    try {
        let list = await Product.find({})

        if(list.length>0){
            res.json(list.reverse())
        }

    } catch (error) {
        console.log({ "error": error })
    }
})


app.put('/removeproduct', async (req, res) => {
    try {
        let { id } = req.body;
        await Product.deleteOne({ id: id })

        res.json({ message: "Product removed successfully" })
    } catch (error) {
        console.log({ "error": error })
    }
})



app.listen(port, () => {
    console.log("Server listening at port ", port)
})


