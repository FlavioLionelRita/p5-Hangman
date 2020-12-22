const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const Service = require("./lib/service");
let service = new Service();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router); 
app.use(express.static('public'));

app.listen(8080);

app.get('/word/random', function (req, res) {
    let data = service.randomWord();  
    res.send(data);
});

console.log('Server running at: http://localhost:8080'); 

//http://localhost:8080/word/random