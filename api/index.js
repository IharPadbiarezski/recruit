import express from "express"
import cors from "cors"
import mysql from "mysql"

const app =  express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "test"
})


app.use(express.json())
app.use(cors())

app.get("/", (req,res) => {
    res.json("hello from back")
})

app.get("/books", (req,res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err,data) => {
        // console.log(err)
        // if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req,res) => {
    const q = "INSERT INTO books (`title`,`desc`,`cover`, `price`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ]

    db.query(q, [values], (err,data) => {
        if(err) return res.json(err)
        return res.json("Book has been created successfully")
    })
})

app.delete("/books/:id", (req,res) => {
    const bookId = req.param.id;
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q, [bookId], (err,data)=> {
        if(err) return res.json(err)
        return res.json("Book has been deleted successfully")
    })
})

app.put("/books/:id", (req,res) => {
    const bookId = req.param.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ]

    db.query(q, [...values, bookId], (err,data)=> {
        if(err) return res.json(err)
        return res.json("Book has been updated successfully")
    })
})

app.listen(8800, () => {
    console.log("Conected to backend")
})