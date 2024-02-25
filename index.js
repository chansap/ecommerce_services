const express = require("express");
const dotenv = require("dotenv");

const dbConnection = require("./data/dbConnect.js");
const authRoute = require("./routes/auth.routes.js");
const userRouter = require("./routes/user.routes.js");
const prodRouter = require("./routes/product.routes.js");
const cartRouter = require("./routes/cart.routes.js");
const orderRouter = require("./routes/order.routes.js");
const loggermiddleware = require("./middlewares/logConfig.middleware.js");
const globalErrorMiddleware = require("./middlewares/globalError.middleware.js");

const app = express();

dotenv.config({
  path: "./data/config.env",
});

// Middlewares
app.use(express.json());
app.use(loggermiddleware);

// DB Connect
dbConnection();

// Routes
app.use("/auth", authRoute);
app.use("/user", userRouter);
app.use("/product", prodRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Hello from Ecom");
});

// Global Error Handler
app.use(globalErrorMiddleware);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on ${process.env.PORT || 4000}`);
});
