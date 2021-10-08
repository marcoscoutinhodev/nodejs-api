const express = require("express");

const connection = require("./Database/connection");

const UserRoutes = require("./Routes/UserRoutes");

const PORT = 3001;
const app = express();

app.use(express.json());

app.use("/user", UserRoutes);

connection
    .authenticate()
    .then(() => {
        console.log("Database connected");
    })
    .catch(err => {
        console.log(`Error connecting database: ${err.message}`);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});