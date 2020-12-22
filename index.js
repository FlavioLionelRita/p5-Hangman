const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const ConfigExtents = require('config-extends');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router); 
app.use(express.static('public'));

(async () => { 
    try {
        let host =   process.env.APP_HOST || 'http://localhost';
        let port = process.env.APP_PORT || '8000';
        let config = await ConfigExtents.apply(path.join(__dirname,'config'));

        for(let k in config.category){
            let list = config.category[k];
            let words= [];
            for(let l in list)
                words.push({name:l,meaning:list[l]});
            config.category[k]= {length:words.length,words:words};         
        }

        app.get('/health', function (req, res) {
            res.send(new Date().toTimeString());
        });
        app.get('/category/:category/age/:age/level/:level/word/random', function (req, res) {
            let _category   = req.params.category!='null'?req.params.category:'english';
            let age   = req.params.age!='null'?parseInt(req.params.age):15;
            let level = req.params.level!='null'?parseInt(req.params.level):1;
            let version = config.versions.find(p=> p.age.from <= age && p.age.to >= age && p.level ==level && p.category == _category);
            let category = config.category[version.category]; 
            let index= Math.floor(Math.random() * category.length);
            let word = category.words[index]; 
            res.send(word);
        });        

        app.listen(port);
        console.log('Server running at: '+host+':'+port); 
        process.exitCode = 0;
        return 0;
    }
    catch (error) {     
        console.error(error);  
        process.exitCode = -1;
        return -1;
    }    
})();