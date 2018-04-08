const http = require('http');
const chalk = require('chalk');
const path =require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const conf = require('./config/defaultConfig');

const server = http.createServer((req, res)=>{
	const filePath = path.join(conf.root,req.url);
	try{
		stat(filePath).then(stats=>{
			if (stats.isFile()){
				res.statusCode =200;
				res.setHeader('Content-Type','text/plain');
				fs.createReadStream(filePath).pipe(res);
			}else if(stats.isDirectory()){
				readdir(filePath).then((files)=>{
					res.statusCode =200;
					res.setHeader('Content-Type','text/plain');
					res.end(files.join(','));
				});
			}
		}).catch(err=>{
			res.statusCode = 404;
			res.setHeader('Content-Type','text/plain');
			res.end(err.statusCode);
		});
	} 
	catch(ex){
		res.statusCode = 404;
		res.setHeader('Content-Type','text/plain');
		res.end('is not a directory');
	}
});

server.listen(conf.port,conf.hostname,()=>{
	const addr = 'http://'+conf.hostname+':'+conf.port;
	console.log('Server started at' + chalk.green(addr));
});
