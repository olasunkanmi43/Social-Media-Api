const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

const app = express();
dotenv.config()


app.use(cors());
app.use(express.json());

// ALL API ROUTES
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// CONNECT WITH MONGODB DATABASE
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}). then(() => {
    console.log("MongoDB Connected is Successfully!")
}).catch((err) => {
    console.log(err.message);
})



const PORT = process.env.PORT || 9000

app.listen(PORT, () =>{
    console.log(`Server up and running on port ${PORT}`)
})