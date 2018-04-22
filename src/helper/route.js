const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const Handlebars = require('handlebars');
const path = require('path');
const config = require('../config/defaultConfig');


const tplPath = path.join(__dirname, '../template/dir.html');
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());

module.exports = async function(req,res,filePath){
	try{
		const stats = await stat(filePath);
		if(stats.isFile()){
			res.statusCode=200;
			res.setHeader('Content-Type','text/plain');
			fs.createReadStream(filePath).pipe(res);
		}else if(stats.isDirectory()){
			const files = await readdir(filePath);
			res.statusCode=200;
			res.setHeader('Content-Type','text/html');
			let dir = path.relative(config.root,filePath);
			if(dir === ''){
				dir = '';
			}else{
				dir = '/'+dir;
			}
			console.log(dir);
			const data = {
				title: path.basename(filePath),
				dir: dir,
				files
			};
			res.end(template(data));
		}
	}catch(ex){
		console.log(ex);
		res.statusCode = 404;
		res.setHeader('Content-Type','text/plain');
		res.end(filePath+'is not a file or a directory');
	}
}