import express, { json } from 'express'
import mysql from 'mysql'
import cors from 'cors'
import axios from 'axios'
import { readFile } from 'fs/promises';
// import mongoose from 'mongoose'
import { MongoClient } from 'mongodb';

// mongoose.connect("mongodb+srv://nosrepsiht2002:NDLEHZGdEgOuAiEt@cluster0.fet2ix5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
// import i18n from '../i18n'
// import { useTranslation } from 'react-i18next'

// import { t } from './i18n.js'
// const locales = {
//     en: {title: 'English'},
//     ru: {title: 'Русский'}
// }

// import { Server } from 'socket.io'
// import { createServer } from 'http'

import {init, t} from 'i18next'

const url = `https://api.telegram.org/bot7025954997:AAEuUd8kvV8vd_KSVEqHTACVd2_zjnzbNm4/sendMessage`
const urlLocation = `https://api.telegram.org/bot7025954997:AAEuUd8kvV8vd_KSVEqHTACVd2_zjnzbNm4/sendlocation`

const conStr = 'mongodb+srv://nosrepsiht2002:NDLEHZGdEgOuAiEt@cluster0.fet2ix5.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0'
// mongoose.connect(conStr)

// const twilio new
const app = express()

init({
    lng: 'ru',
    resources: {
      en: {
        translation: JSON.parse(await readFile('./locales/en.json', 'utf8')),
      },
      ru: {
        translation: JSON.parse(await readFile('./locales/ru.json', 'utf8')),
      },
    },
  });

app.use(cors())
// const server = createServer(app)
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         // origin: "https://956e4bfb3670f7.lhr.life",
//         methods: ["GET", "POST"],
//     },
// })

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"mydb"
})

// const db = mysql.createConnection({
//     host:"06g.h.filess.io",
//     user:"mydb_beautybowl",
//     password:"a8afc1a365dc1263949d7daa1154de671aa7d41c",
//     database:"mydb_beautybowl",
//     port: "3307"
// })

app.use(express.json())

// const translationsDir = path.join(__dirname, 'translations');

// app.get('/api/translations/:lang', (req, res) => {
//   const { lang } = req.params;
//   const filePath = path.join(translationsDir, `${lang}.json`);
//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       res.status(404).json({ message: 'Translations not found' });
//       return;
//     }
//     const translations = JSON.parse(data);
//     res.json(translations);
//   });
// });


app.get("/", (req, res)=>{
    res.json("hello, this is backend 2a")
})

app.get("/products", async (req, res)=>{
    // const q = "SELECT * FROM products"
    // db.query(q, (err,data)=>{
    //     if(err) return res.json(err)
    //     return res.json(data)
    // })

    // 1
    const mongoClient = new MongoClient(conStr)
    const data = await mongoClient
    .db()
    .collection('products')
    .find({})
    .sort( {product_cost: 1} )
    .toArray()

    // console.log(data)
    res.json(data)

    // 2
    // MongoClient.connect(conStr, (err, db) => {
    //     if (err) throw err
    //     let dbo = db.db("mydb")
    //     dbo.collection("products").find({}).toArray((err, res) => {
    //         if (err) throw err
    //         console.log(res)
    //         db.close
    //     })
    // })
})

app.get("/components", async (req, res)=>{
    // console.log("hello?)")
    var bigData = []

    const mongoClient = new MongoClient(conStr)
    const data_product_covers = await mongoClient
    .db()
    .collection('product_covers')
    .find({})
    .toArray()

    const data_product_additional_covers = await mongoClient
    .db()
    .collection('product_additional_covers')
    .find({})
    .toArray()

    const data_product_stuffings = await mongoClient
    .db()
    .collection('product_stuffings')
    .find({})
    .toArray()

    const data_product_hats = await mongoClient
    .db()
    .collection('product_hats')
    .find({})
    .toArray()

    const data_product_pouring = await mongoClient
    .db()
    .collection('product_pouring')
    .find({})
    .toArray()

    bigData[0] = data_product_covers
    bigData[1] = data_product_additional_covers
    bigData[2] = data_product_stuffings
    bigData[3] = data_product_hats
    bigData[4] = data_product_pouring
    return res.json(bigData)

    // var q = "SELECT * FROM product_covers"

    // db.query(q, (err,data)=>{
    //     if(err) return res.json(err)
    //     bigData[0] = data
    // })

    // q = "SELECT * FROM product_additional_covers"

    // db.query(q, (err,data)=>{
    //     if(err) return res.json(err)
    //     bigData[1] = data
    // })

    // q = "SELECT * FROM product_stuffings"

    // db.query(q, (err,data)=>{
    //     if(err) return res.json(err)
    //     bigData[2] = data
    // })

    // q = "SELECT * FROM product_hats"

    // db.query(q, (err,data)=>{
    //     if(err) return res.json(err)
    //     bigData[3] = data
    // })

    // q = "SELECT * FROM product_pouring"

    // db.query(q, (err,data)=>{
    //     if(err) return res.json(err)
    //     bigData[4] = data
    //     return res.json(bigData)
    // })

    // q = "SELECT * FROM product_forms"

    // db.query(q, (err,data)=>{
    //     if(err) return res.json(err)
    //     bigData[5] = data
    //     return res.json(bigData)
    // })
})

// app.delete("/add/:id", (req, res)=>{
//     console.log(req.params.id)
    
//     const product_id = req.params.id;
//     const q = "DELETE FROM products WHERE product_id = ?"

//     db.query(q, [book_id], (err, data)=>{
//         if(err) return res.json(err)
//         return res.json("Product has been deleted successfully.")
//     })
// })

app.post("/register", async (req, res)=>{
    // console.log("hello?")
    // console.log(req.body)
    
    const mongoClient = new MongoClient(conStr)

    const data_users = await mongoClient
    .db()
    .collection('users')
    .find({username: req.body.username})
    .toArray()
    // .then(async () => {
        
    // }
    // )

    if (data_users.length == 0) {
        await mongoClient
        .db()
        .collection('users')
        .insertOne({username: req.body.username, password: req.body.password})
        res.json([req.body.username, "success"])
    }

    else {
        return res.json([req.body.username, "fail"])
    }

    // const q = "INSERT INTO `users` (`username`, `password`) VALUES (?)"
    // const values = [
    //     req.body.username,
    //     req.body.password]

    // db.query(q, [values], (err, data)=>{
    //     if(err) return res.json([req.body.username, "fail"])
    //     return res.json([req.body.username, "success"])
    // })
})

app.post("/getAccount", (req, res)=>{

    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q, req.body[0], (err, data)=>{
        if(err) return res.json([req.body.username, "fail"])
        return res.json(data)
    })
})

app.post("/setLocation", (req, res)=>{
    // console.log("hello?")
    // console.log("test-id: " + req.body[1][1])

    const q = "UPDATE `users` SET `locationX` = ?, `locationY` = ? WHERE (`username` = ?)"
    const values = [
        req.body[1][1],
        req.body[1][0],
        req.body[0]
    ]

    // const values = [
    //     1,
    //     2,
    //     "mo"
    // ]

    db.query(q, values, (err, data)=>{
        if(err) return res.json(err)
        return res.json("norm")
    })

    // return res.json("test")
})

app.delete("/getLocation/:username", (req, res)=>{
    console.log("hello?23")
    // console.log(req.body[0])
    // console.log(req.body[1][0].product_form.split(";"))

    // let locationX;
    // let locationY;

    const q = "SELECT locationX, locationY FROM users WHERE username = ?"

    // const value = 'mo'

    db.query(q, req.params.username, (err, data)=>{
        if(err) return res.json(err)
        // locationX = data[0].locationX
        // locationY = data[0].locationY
        return res.json([data[0].locationX, data[0].locationY])
        // return res.json(data)
        // console.log(data)
    })

    // console.log(locationX, locationY)

    // q = "INSERT INTO `users` (`username`, `password`) VALUES (?)"
    // values = [
    //     req.body.username,
    //     req.body.password]

    // db.query(q, [values], (err, data)=>{
    //     if(err) return res.json(err)
    //     return res.json("success")
    // })

    // return res.json("success")
})

// app.post("/getCost", (req, res)=>{
//     // console.log(req.body.length)
//     // console.log(Object.values(req.body[0][0])[4])
    
//     let bigData = 0
//     let q = ""

//     for (let i = 0; i < req.body.length; i++) {
//         q = "SELECT cover_cost FROM product_covers WHERE cover = ?"
//         db.query(q, Object.values(req.body[i][0])[4], (err, data1)=>{
//             if(err) return res.json(err)
//             bigData += Object.values(data1[0])[0]

//             q = "SELECT additional_cover_cost FROM product_additional_covers WHERE additional_cover = ?"
//             db.query(q, Object.values(req.body[i][0])[5], (err, data2)=>{
//                 if(err) return res.json(err)
//                 bigData += Object.values(data2[0])[0]

//                 let testArr = Object.values(req.body[i][0])[7].split(";")
//                 for (let j = 0; j < testArr.length; j++) {
//                         q = "SELECT stuffing_cost FROM product_stuffings WHERE stuffing = ?"
//                         db.query(q, testArr[j], (err, data3)=>{
//                             if(err) return res.json(err)
//                             bigData += Object.values(data3[0])[0]
//                             console.log("hehe")
//                         })
//                 }
//             })
//         })
//     }

//     // console.log(bigData)
//     // return res.json(bigData)

//     // q = "SELECT * FROM product_additional_covers"

//     // db.query(q, (err,data)=>{
//     //     if(err) return res.json(err)
//     //     bigData[1] = data
//     // })

//     // q = "SELECT * FROM product_stuffings"

//     // db.query(q, (err,data)=>{
//     //     if(err) return res.json(err)
//     //     bigData[2] = data
//     // })

//     // q = "SELECT * FROM product_forms"

//     // db.query(q, (err,data)=>{
//     //     if(err) return res.json(err)
//     //     bigData[3] = data
//     //     return res.json(bigData)
//     // })
// })

// app.post("/getCost", async (req, res)=>{

//     // let a = 0;
//     // try {
//     //     console.log("Need: 1")
//     //     // a += await testA()
//     //     console.log(await testA())
//     //     console.log("3: ")
//     // }

//     // catch (err) {
//     //     console.log(err)
//     // }

//     let bigData = 0;
//     let oneCost = 0;
//     let q = "";
//     let counter = 0;
//     let counterNeeded = 0;

//     for (let i = 0; i < req.body[0].length; i++) {
//         // console.log("Test: " + Object.values(req.body[0][i])[7].split(";").length)
//         counterNeeded += Object.values(req.body[0][i])[5].split(";").length + Object.values(req.body[0][i])[7].split(";").length
//     }

//     // console.log('counterNeeded: ' + counterNeeded)
    
//     // console.log("Length: " + req.body[0].length)
//     for (let i = 0; i < req.body[0].length; i++) {
//         q = "SELECT cover_cost FROM product_covers WHERE cover = ?";
//         db.query(q, Object.values(req.body[0][i])[4], (err, data1)=>{
//             if(err) return res.json(err);
//             bigData += Object.values(data1[0])[0];
//             // console.log("bigData: " + bigData)
            
//             let testArr = Object.values(req.body[0][i])[5].split(";");
//             for (let j = 0; j < testArr.length; j++) {
//                 q = "SELECT additional_cover_cost FROM product_additional_covers WHERE additional_cover = ?";
//                 db.query(q, testArr[j], (err, data2)=>{
//                     if(err) return res.json(err);
//                     bigData += Object.values(data2[0])[0];
//                     counter++;
//                     // console.log("bigData: " + bigData)
                    
//                     let testArr2 = Object.values(req.body[0][i])[7].split(";");
//                     for (let k = 0; k < testArr2.length; k++) {
//                         q = "SELECT stuffing_cost FROM product_stuffings WHERE stuffing = ?";
//                         db.query(q, testArr2[k], (err, data3)=>{
//                             if(err) return res.json(err);
//                             bigData += Object.values(data3[0])[0];
//                             // console.log("bigData: " + bigData)

//                             counter++;
//                             if(counter === counterNeeded) {
//                                 // Execute return statement or any other code here
//                                 console.log(bigData)
//                                 console.log("hehe: " + counterNeeded);
//                                 return res.json(bigData)
//                             }
//                         });
//                     }
//                 });
//             }
//         });
//     }
// });

app.post("/order", async (req, res)=>{
    
    // console.log(req.body[6])
    // console.log("1:" + new Date(req.body[6]).toLocaleString())
    // console.log("2:" + new Date(req.body[6]))
    const mongoClient = new MongoClient(conStr)
    // console.log(req.body[1][0].product_hat)
    // return;
    let q
    let allCost = 0
    let oneCost = 0

    let productCosts = []
    
    // Get Products
    for (let i = 0; i < req.body[1].length; i++) {

        if (req.body[1][i].product_id == 0) {
            // console.log("eh...(")
            oneCost = 0
            
            // Get Cover cost
            const data_cover_cost = await mongoClient
            .db()
            .collection('product_covers')
            .find({cover: req.body[1][i].product_cover})
            .toArray()
            oneCost += parseInt(data_cover_cost[0].cover_cost)
            // console.log("Cover2: " + data_cover_cost[0].cover_cost)
            
            // q = "SELECT cover_cost FROM product_covers WHERE cover = ?";
            // let coverCost = await getValue(q, req.body[1][i].product_cover)
            // oneCost += coverCost[0].cover_cost
            // console.log("Cover: " + coverCost[0].cover_cost)

            if (req.body[1][i].product_additional_cover != "") {
                // Get Additional Cover Costs
                let testArr = req.body[1][i].product_additional_cover.split(";");
                for (let j = 0; j < testArr.length; j++) {
                    const data_additional_cover_cost = await mongoClient
                    .db()
                    .collection('product_additional_covers')
                    .find({additional_cover: testArr[j]})
                    .toArray()
                    oneCost += parseInt(data_additional_cover_cost[0].additional_cover_cost)

                    // q = "SELECT additional_cover_cost FROM product_additional_covers WHERE additional_cover = ?";
                    // let additionalCoverCost = await getValue(q, testArr[j])
                    // oneCost += additionalCoverCost[0].additional_cover_cost
                    // console.log("additionalCoverCost: " + additionalCoverCost[0].additional_cover_cost)
                }
            }

            if (req.body[1][i].product_stuffing != "") {
                // Get Stuffing Costs
                let testArr2 = req.body[1][i].product_stuffing.split(";");
                for (let k = 0; k < testArr2.length; k++) {
                    const data_stuffing_cost = await mongoClient
                    .db()
                    .collection('product_stuffings')
                    .find({stuffing: testArr2[k].split(":")[0]})
                    .toArray()
                    oneCost += (parseInt(data_stuffing_cost[0].stuffing_cost) * parseInt(testArr2[k].split(":")[1])) / 10

                    // q = "SELECT stuffing_cost FROM product_stuffings WHERE stuffing = ?";
                    // let stuffingCost = await getValue(q, testArr2[k].split(":")[0])
                    // oneCost += (stuffingCost[0].stuffing_cost * parseInt(testArr2[k].split(":")[1])) / 10
                    // console.log("stuffingCost: " + (stuffingCost[0].stuffing_cost * parseInt(testArr2[k].split(":")[1])) / 10)
                }
            }

            if (req.body[1][i].product_pouring != "") {
                // Get Pouring Costs
                let testArr2 = req.body[1][i].product_pouring.split(";");
                for (let k = 0; k < testArr2.length; k++) {
                    const data_pouring_cost = await mongoClient
                    .db()
                    .collection('product_pouring')
                    .find({pouring: testArr2[k]})
                    .toArray()
                    oneCost += parseInt(data_pouring_cost[0].pouring_cost)

                    // q = "SELECT pouring_cost FROM product_pouring WHERE pouring = ?";
                    // let pouringCost = await getValue(q, testArr2[k])
                    // oneCost += pouringCost[0].pouring_cost
                    // console.log("pouringCost: " + pouringCost[0].pouring_cost)
                }
            }

            if (req.body[1][i].product_hat != "") {
                // Get Hat cost
                const data_hat_cost = await mongoClient
                .db()
                .collection('product_hats')
                .find({hat: req.body[1][i].product_hat})
                .toArray()
                oneCost += parseInt(data_hat_cost[0].hat_cost)

                // q = "SELECT hat_cost FROM product_hats WHERE hat = ?";
                // let hatCost = await getValue(q, req.body[1][i].product_hat)
                // oneCost += hatCost[0].hat_cost
                // console.log("hatCost: " + hatCost[0].hat_cost)
            }

            allCost += parseInt(oneCost) * parseInt(req.body[1][i].product_quantity);
            productCosts.push(oneCost)
            
        }

        else {
            // console.log("yohoo!")

            // Get cost of a product
            const data_product_cost = await mongoClient
            .db()
            .collection('products')
            .find({product_name: req.body[1][i].product_name}, {product_cost: 1})
            .toArray()
            // console.log(data_product_cost)
            // console.log(data_product_cost[0])
            // console.log("Product cost2: " + (data_product_cost[0].product_cost * req.body[1][i].product_quantity))
            allCost += parseInt(data_product_cost[0].product_cost) * parseInt(req.body[1][i].product_quantity);
            productCosts.push(data_product_cost[0].product_cost)
            
            // q = "SELECT product_cost FROM products WHERE product_name = ?"
            // let testData4 = await getValue(q, req.body[1][i].product_name)
            // console.log("Product cost: " + (testData4[0].product_cost * req.body[1][i].product_quantity))

            // console.log("Price: " + Object.values(req.body[1][i])[3] * Object.values(req.body[1][i])[2])
            // allCost += testData4[0].product_cost * req.body[1][i].product_quantity;
            // console.log("Cost: " + testData4[0].product_cost * req.body[1][i].product_quantity)
            // productCosts.push(testData4[0].product_cost)
        }
    }

    // console.log(productCosts)

    // let counter = 0;

    // Get Location
    // q = "SELECT locationX, locationY, user_id FROM users WHERE username = ?"
    // let testData = await getValue(q, req.body[0])
    // let user_id = Object.values(location[0])[2]

    // Get user_id
    // q = "SELECT user_id FROM users WHERE username = ?"
    // let testData = await getValue(q, req.body[0])
    // let user_id = Object.values(location[0])[2]

    // console.log(location)

    // Get maximum order_id
    let max_order_id = 1
    const data_max_order_id = await mongoClient
    .db()
    .collection('orders')
    .find({})
    .sort({order_id:-1})
    .limit(1)
    .toArray()

    // console.log(max_order_id)

    if (data_max_order_id.length != 0) {
        max_order_id = data_max_order_id[0].order_id + 1
    }

    // q = "SELECT MAX(order_id) as order_id FROM orders"
    // let testData2 = await getValue(q)


    // console.log(Object.values(testData2[0])[0])

    // console.log("date")
    // console.log(new Date(Date.now()))

    // console.log("my_date")
    // console.log(new Date(req.body[6]))
    // return

    // Insert an order

    await mongoClient
    .db()
    .collection('orders')
    .insertOne({order_id: max_order_id, phone: req.body[0], cost: allCost, locationX: req.body[3], locationY: req.body[2], datetime: req.body[6], future_order: req.body[5], status: 0, chopsticks_quantity: req.body[4].chopsticks_quantity, delivery_method: req.body[4].delivery_method})

    // q = "INSERT INTO `orders` (`order_id`, `phone`, `cost`, `locationX`, `locationY`, `datetime`, `future_order`, `status`, `chopsticks_quantity`, `delivery_method`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    // console.log(req.body[2])
    // console.log(req.body[3])
    // // let testData3 = await getValue(q, [testData2[0].order_id + 1, testData[0].user_id, allCost, req.body[3], req.body[2], new Date(req.body[6]), req.body[5], 0, req.body[4].chopsticks_quantity, req.body[4].delivery_method])
    // let testData3 = await getValue(q, [testData2[0].order_id + 1, req.body[0], allCost, req.body[3], req.body[2], new Date(req.body[6]), req.body[5], 0, req.body[4].chopsticks_quantity, req.body[4].delivery_method])

    let message = "Номер заказа: " + max_order_id + "\n\n"
    // let message = "Номер заказа: " + (testData2[0].order_id + 1) + "\n\n"
    let products = []
    
    // Insert an order_details
    for (let i = 0; i < req.body[1].length; i++) {

        await mongoClient
        .db()
        .collection('order_details')
        .insertOne({order_id: max_order_id, product_name: req.body[1][i].product_name, product_quantity: parseInt(req.body[1][i].product_quantity), product_cost: productCosts[i], product_cover: req.body[1][i].product_cover, product_additional_cover: req.body[1][i].product_additional_cover != "" ? req.body[1][i].product_additional_cover : null, product_stuffing: req.body[1][i].product_stuffing != "" ? req.body[1][i].product_stuffing : null, product_pouring: req.body[1][i].product_pouring != "" ? req.body[1][i].product_pouring : null, product_hat: req.body[1][i].product_hat, product_id: req.body[1][i].product_id})

        // q = "INSERT INTO `order_details` (`order_id`, `product_name`, `product_quantity`, `product_cost`, `product_cover`, `product_additional_cover`, `product_stuffing`, `product_pouring`, `product_hat`, `product_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
        // let testData4 = await getValue(q, [testData2[0].order_id + 1, req.body[1][i].product_name, parseInt(req.body[1][i].product_quantity), productCosts[i], req.body[1][i].product_cover, req.body[1][i].product_additional_cover != "" ? req.body[1][i].product_additional_cover : null, req.body[1][i].product_stuffing != "" ? req.body[1][i].product_stuffing : null, req.body[1][i].product_pouring != "" ? req.body[1][i].product_pouring : null, req.body[1][i].product_hat, req.body[1][i].product_id])
        // db.query(q, [Object.values(data2[0])[0] + 1, Object.values(req.body[2][i])[1], Object.values(req.body[2][i])[2], Object.values(req.body[2][i])[3], Object.values(req.body[2][i])[4], Object.values(req.body[2][i])[5], Object.values(req.body[2][i])[6], Object.values(req.body[2][i])[7]], (err, data4)=>{
        //     if(err) return res.json(err)
        //     counter++
        //     if (counter === req.body[2].length) {
        //         console.log(counter + " =? " + req.body[2].length)
        //         return res.json("success2")
        //     }
        // })

        let _name = req.body[1][i].product_id != 0 ? t('names.' + req.body[1][i].product_name) : req.body[1][i].product_name
        let _stuffing = req.body[1][i].product_stuffing != null && req.body[1][i].product_stuffing != "" ? req.body[1][i].product_id != 0 ? req.body[1][i].product_stuffing.split(";").map((stuffing2) => t('stuffings.' + stuffing2)).join(', ') : req.body[1][i].product_stuffing.split(";").map((stuffing3) => t('stuffings.' + stuffing3.split(":")[0]) + " (" + stuffing3.split(":")[1] + " " + t('grams') + ")").join(', ') : t('no')
        // let _pouring = req.body[1][i].product_pouring != null && req.body[1][i].product_pouring != "" ? t('pourings.' + req.body[1][i].product_pouring) : t('no')
        let _pouring = req.body[1][i].product_pouring != null && req.body[1][i].product_pouring != "" ? req.body[1][i].product_pouring.split(";").map((product_pouring) => t('pourings.' + product_pouring)).join(', ') : t('no')
        let _hat = req.body[1][i].product_hat != null && req.body[1][i].product_hat != "" ? t('hats.' + req.body[1][i].product_hat) : t('no')
        let _cover = t('covers.' + req.body[1][i].product_cover)
        let _additional_cover = req.body[1][i].product_additional_cover != null && req.body[1][i].product_additional_cover != "" ? req.body[1][i].product_additional_cover.split(";").map((additional_cover) => t('additional_covers.' + additional_cover)).join(', ') : t('no')
        let _quantity = req.body[1][i].product_quantity
        let _cost = req.body[1][i].product_cost
        let _price = parseInt(req.body[1][i].product_quantity) * parseInt(req.body[1][i].product_cost)

        products.push({_name, _stuffing, _pouring, _hat, _cover, _additional_cover, _quantity, _cost, _price})
        // products.push({_name})
    }

    for (let i = 0; i < products.length; i++) {
        message += t('name') + ": " + products[i]._name + "\n" +
        t('stuffing') + ": " + products[i]._stuffing + "\n" +
        t('pouring') + ": " + products[i]._pouring + "\n" +
        t('hat') + ": " + products[i]._hat + "\n" +
        t('cover') + ": " + products[i]._cover + "\n" +
        t('additional_cover') + ": " + products[i]._additional_cover + "\n" +
        t('quantity') + ": " + products[i]._quantity + "\n" +
        t('cost') + ": " + (products[i]._cost).toLocaleString('en') + " " + t('sum') + "\n" +
        t('price') + ": " + (products[i]._price).toLocaleString('en') + " " + t('sum')

        if (i + 1 < products.length) {
            message += "\n\n"
        }
    }

    // for (let i = 0; i < products.length; i++) {
    //     message += t('name') + ": " + products[i]._name

    //     if (i + 1 < products.length) {
    //         message += "\n\n"
    //     }
    // }

    message += "\n\n" + "Количество палочек: " + req.body[4].chopsticks_quantity
    req.body[4].delivery_method == "free" ? message += "\n" + "Способ доставки: Бесплатная (медленная)" : message += "\n" + "Способ доставки: Платная (Яндекс Такси)"
    message += "\n" + "Итого: " + (allCost).toLocaleString('en') + " " + t('sum')
    req.body[5] == true ? message += "\n" + "Приготовить: " + req.body[6] : message += "\n" + "Приготовить: сейчас"
    message += "\n\n+998" + req.body[0]

    // console.log("nice")

    // // Get location
    // q = "SELECT locationX, locationY, user_id FROM users WHERE username = ?"
    // db.query(q, req.body[0], (err, data1)=>{
    //     if(err) return res.json(err)

    //     // Get maximum order_id
    //     q = "SELECT MAX(order_id) FROM orders"
    //     db.query(q, (err, data2)=>{
    //         if(err) return res.json(err)

    //         // Insert an order
    //         q = "INSERT INTO `orders` (`order_id`, `user_id`, `cost`, `locationX`, `locationY`, `datetime`) VALUES (?, ?, ?, ?, ?, NOW())"
    //         db.query(q, [Object.values(data2[0])[0] + 1, data1[0].user_id, req.body[1], data1[0].locationX, data1[0].locationY], (err, data4)=>{
    //             if(err) return res.json(err)
                
    //             // Insert an order_details
    //             for (let i = 0; i < req.body[2].length; i++) {
    //                 q = "INSERT INTO `order_details` (`order_id`, `product_name`, `product_quantity`, `product_cost`, `product_cover`, `product_additional_cover`, `product_form`, `product_stuffing`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);"
    //                 db.query(q, [Object.values(data2[0])[0] + 1, Object.values(req.body[2][i])[1], Object.values(req.body[2][i])[2], Object.values(req.body[2][i])[3], Object.values(req.body[2][i])[4], Object.values(req.body[2][i])[5], Object.values(req.body[2][i])[6], Object.values(req.body[2][i])[7]], (err, data4)=>{
    //                     if(err) return res.json(err)
    //                     counter++
    //                     if (counter === req.body[2].length) {
    //                         console.log(counter + " =? " + req.body[2].length)
    //                         return res.json("success2")
    //                     }
    //                 })
    //             }
    //         })
    //     })
    // })

    let location_message_id = 0

    await axios.post(urlLocation, {
        // chat_id: -1002036778710,
        chat_id: -1002025697043,
        latitude: req.body[3],
        longitude: req.body[2],
    })
    .then((res) => {
        // console.log(res.data)
        // console.log("MessageID: " + res.data.result.message_id)
        location_message_id = res.data.result.message_id
    })
    .catch((err) => {
        console.log(err)
    })

    const someData = await axios.post(url, {
        // chat_id: -1002036778710,
        chat_id: -1002025697043,
        parse_mode: 'html',
        text: message,
        reply_to_message_id: location_message_id
    })
    .then((res) => {
        // console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
    })

    console.log("Total: " + allCost)
    return res.json("nice")
})

let getValue = (q, value) => {
    return new Promise((resolve, reject) => {
        db.query(q, value, (err, data)=>{
            if(err) reject(err);
            else {
                resolve(data)
            }
        })
    })
}

// let testA = () => {
//     return new Promise((resolve, reject) => {
//         let q = "SELECT cover_cost FROM product_covers WHERE cover = 'nori'";
//         db.query(q, (err, data1)=>{
//             if(err) reject(err);
//             else {
//                 // return res.json(Object.values(data1[0])[0])
//                 console.log("Test: " + Object.values(data1[0])[0])
//                 resolve(Object.values(data1[0])[0])
//             }
//         })
//     })
// }

// app.post("/order", (req, res)=>{
//     console.log("hello?25")
// })

app.post("/myOrders", async (req, res)=>{
    
    // Get user_id ----- Object.values(data1[0])[0]
    // let q = "SELECT user_id FROM users WHERE username = ?"
    // let data1 = await getValue(q, req.body[0])
    
    // // Get My Orders

    const mongoClient = new MongoClient(conStr)

    const data_my_orders = await mongoClient
    .db()
    .collection('orders')
    .find({phone: req.body[0]})
    .sort({order_id: -1})
    .toArray()

    return res.json(data_my_orders)

    // // q = "SELECT * FROM orders WHERE user_id = ? ORDER BY order_id DESC"
    // // let data2 = await getValue(q, Object.values(data1[0])[0])
    // let q = "SELECT * FROM orders WHERE phone = ? ORDER BY order_id DESC"
    // let data2 = await getValue(q, req.body[0])
    // // console.log(req.body[0])
    // return res.json(data2)
})

app.get("/allOrders", async (req, res)=>{
    
    // Get All Orders
    let q = "SELECT * FROM orders ORDER BY order_id DESC"
    let data2 = await getValue(q)
    return res.json(data2)
})

app.delete("/getOrder/:id", async (req, res)=>{
    // console.log("test: " + req.params.id)

    const mongoClient = new MongoClient(conStr)

    // Get Order
    const data_order = await mongoClient
    .db()
    .collection('orders')
    .find({order_id: parseInt(req.params.id)})
    .toArray()
    
    // let q = "SELECT * FROM orders WHERE order_id = ?"
    // let data = await getValue(q, req.params.id)
    // // console.log(data[0].locationX)
    // // return res.json(data)

    // Get Order Details
    const data_order_details = await mongoClient
    .db()
    .collection('order_details')
    .find({order_id: parseInt(req.params.id)})
    .toArray()

    console.log(data_order)
    console.log(data_order_details)
    return res.json([data_order, data_order_details])

    // q = "SELECT * FROM order_details WHERE order_id = ?"
    // let data2 = await getValue(q, data[0].order_id)
    // return res.json([data, data2])
})

app.get("/getLastOrder", async (req, res)=>{
    
    // Get Last Order
    let q = "SELECT * FROM orders ORDER BY order_id DESC LIMIT 1"
    let data2 = await getValue(q)
    return res.json(data2)
})

app.post("/login", async (req, res)=>{
    // console.log("hello?")
    // console.log(req.body)

    const mongoClient = new MongoClient(conStr)

    const data_users = await mongoClient
    .db()
    .collection('users')
    .find({username: req.body.username, password: req.body.password})
    .toArray()

    return res.json(data_users)

    // if (data_users.length != 0) {
    //     await mongoClient
    //     .db()
    //     .collection('users')
    //     .insertOne({username: req.body.username, password: req.body.password})
    // }

    // const username = req.body.username
    // const password = req.body.password

    // const q = "SELECT username, password FROM users WHERE username = ? AND password = ?"
    // // const values = [
    // //     req.body.username,
    // //     req.body.password]

    // db.query(q, [username, password], (err, data)=>{
    //     if(err) return res.json(err)
    //     return res.json(data)
    // })
})

// io.on('connection', (socket) => {
//     // console.log('a user connected: ' + socket.id)

//     socket.on("send_message", (data) => {
//         // console.log(data)
//         socket.broadcast.emit("receive_message", data)
//     })

//     socket.on("join_administration", () => {
//         socket.join("administration")
//     })

//     socket.on("make_order", (data) => {
//         // console.log("mda prishlo")
//         socket.to("administration").emit("order", data)
//         // socket.broadcast.emit("order", data)
//     })
// })

// server.listen(3001, ()=>{
//     console.log("server is running")
// })

app.listen(8800, ()=>{
    console.log("connected to backend")
})