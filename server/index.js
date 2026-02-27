const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const log_middleware = require("./middleware/log");
const swaggerDocs = require("./swagger");
const connectDB = require("./config/db");

const app = express();
connectDB();
swaggerDocs(app);

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(log_middleware);

app.get("/health", (req, res) => {
  return res.status(200).json({
    message: "server working well Hello from myContactApp",
    status: "success",
  });
});

const contact = require("./routers/contact");
const user = require("./routers/user");

app.use("/contact", contact);
app.use("/user", user);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
