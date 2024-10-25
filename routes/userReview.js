// const express = require("express");
// const router = express.Router();
// const db = require("../dbConnection");

// router.get("/review", (req, res) => {
//     db.review.find((err, data) => {
//         if (err) {
//             return res.status(500).json({ error: "Failed to fetch reviews." });
//         }
//         res.json(data);
//     });
// });

// router.post("/review", (req, res)=>{
//     const {rating, comment} = req.body
//     if(!rating || !comment){
//         res.status(500).json({ errormsg: "all field are require" });
//     }
//     const result = db.review.insertOne({
//         rating : rating,
//         comment: comment
//     })

//     try {
//         res.status(200).json(result)
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })

// module.exports = router;
