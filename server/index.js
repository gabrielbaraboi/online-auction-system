require("dotenv").config();
require("./config/database.js").connect();

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const listener = app.listen(7055, function(){
    console.log('Listening on port ' + listener.address().port);
});

// //Routes require
const authenticantion = require("./routes/userRoutes");
const { log } = require("console");
// const posts = require("./routes/postRoutes");
// const comments = require("./routes/commentRoutes");
// const messages = require("./routes/messagesRoutes");
// const profile = require("./routes/profileRoutes");

// //config bodyParser & express
app.use(bodyParser.json());
app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(cookieParser());

app.use("/auth", authenticantion);
// app.use("/posts", posts);
// app.use("/comments", comments);
// app.use("/inbox", messages);
// app.use("/profile", profile);
// // app.use('/user', userRoutes);

module.exports = app;