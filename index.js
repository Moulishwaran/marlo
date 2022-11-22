const express = require("express");
const dbConnect = require("./dbConnect");
const app = express();
app.use(express.json());

const userRoute = require("./routes/userRoute");
const transactionsRoute = require("./routes/transactionRoute");

app.use("/api/transactions/", transactionsRoute);
app.use("/api/users/", userRoute);

// PORT
const port = 5000;

app.listen(port, () => console.log(`Nodejs Server Started at port:${port}`));
