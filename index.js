import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

// const twilio new

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"mydb"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.json("hello, this is backend")
})

app.get("/products", (req, res)=>{
    const q = "SELECT * FROM products"
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/components", (req, res)=>{
    // console.log("hello?)")
    var bigData = []
    var q = "SELECT * FROM product_covers"

    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        bigData[0] = data
    })

    q = "SELECT * FROM product_additional_covers"

    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        bigData[1] = data
    })

    q = "SELECT * FROM product_stuffings"

    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        bigData[2] = data
    })

    q = "SELECT * FROM product_forms"

    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        bigData[3] = data
        return res.json(bigData)
    })
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

app.post("/register", (req, res)=>{
    // console.log("hello?")
    // console.log(req.body)

    const q = "INSERT INTO `users` (`username`, `password`) VALUES (?)"
    const values = [
        req.body.username,
        req.body.password]

    db.query(q, [values], (err, data)=>{
        if(err) return res.json(err)
        return res.json("success")
    })
})

app.post("/order", (req, res)=>{
    console.log("hello?")
    console.log(req.body)

    return res.json("success")

    // const q = "INSERT INTO `users` (`username`, `password`) VALUES (?)"
    // const values = [
    //     req.body.username,
    //     req.body.password]

    // db.query(q, [values], (err, data)=>{
    //     if(err) return res.json(err)
    //     return res.json("success")
    // })
})

app.post("/login", (req, res)=>{
    console.log("hello?")
    console.log(req.body)

    const username = req.body.username
    const password = req.body.password

    const q = "SELECT username, password FROM users WHERE username = ? AND password = ?"
    // const values = [
    //     req.body.username,
    //     req.body.password]

    db.query(q, [username, password], (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8800, ()=>{
    console.log("connected to backend")
})