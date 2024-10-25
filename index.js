const express = require("express");
const cors = require("cors");
// const reviewRouter = require("./routes/userReview");
const userRouter = require("./routes/userAccount");

const app = express();


app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use('/reviews', reviewRouter);
app.use('/users', userRouter); 


app.listen(8000, () => {
  console.log("API running on port 8000");
});
