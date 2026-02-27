const express = require("express");
const cors = require("cors");
const logMiddleware = require("./middleware/log");
const swaggerDocs = require("./swagger");

const contact = require("./routers/contact");
const user = require("./routers/user");

const app = express();

swaggerDocs(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logMiddleware);

app.get("/health", (req, res) => {
  return res.status(200).json({
    message: "server working well Hello from myContactApp",
    status: "success",
  });
});

app.use("/contact", contact);
app.use("/user", user);

module.exports = app;
