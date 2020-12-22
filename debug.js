const Path = require('path');
const Fs = require('fs');
const Yaml = require('js-yaml');
const data = require('./config/category/german_english.json');



let content = Yaml.safeDump(data,{ noRefs: true });
Fs.writeFileSync('config/category/german_english.yaml',content,{encoding: "utf8"});