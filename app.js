const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json({
    extended: true,
    limit: '50mb'
}));
app.use(cors());

mongoose.connect(process.env.DB_STRING, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
})

require("./routes/app.routes")(app);

app.listen(process.env.PORT, () => {
    console.log("Server is up on port", process.env.PORT);
});