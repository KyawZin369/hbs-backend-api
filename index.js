const express = require("express")
const app = express();
const db = require("./dbConnection")

app.use("/", (req, res) => {
    // res.json({msg: "Testing api massage"})
    db.client.find(function (err, data) {
        res.json(data)
        db.close();
    })
})


app.listen("8000", ()=>{
    console.log("Api Running in port 8000")
})