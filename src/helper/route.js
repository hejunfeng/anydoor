const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

const tplPath = path.join(__dirname,'../template/dir.html');
const source = fs.readFileSync(tplPath);
const tpltemplate = Handlebars.compile(source.toString());

module.exports = {
	'tpltemplate':tpltemplate
};