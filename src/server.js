const express = require("express");
const path = require("path");
port = 4000;
const app = express();
app.use(express.static(path.join(__dirname, "../public")));
var router = express.Router()
app.use('/',router)
app.use(express.json())

router.get("/", (res) => {
 res.sendFile(__dirname + "/index.html")
})
app.listen(port, function(error){
    if (error){
        console.log('error',error) // if an error appears will print
    }else{
        console.log("server is listening on " + port) //if server starts will print
    }
})




