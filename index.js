/*
    1.Start with an Express web server.
    2.Add configuration for MongoDB
    3.Create Program Model with Mongoose
    4.Write Controller
    5.Define routes for handling all CRUD operations
*/

const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: "http://localhost:8080"
};

const programRouter = require("./routes/program.routes");
app.use(programRouter);

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extented: true}));

app.get("/", (request,response) => {
    response.json({ message: "Bine ati venit in aplicatia mea de backend!"});
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const db = require("./models");

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch((err) => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    })

app.use("/api", programRouter);

module.exports = app;