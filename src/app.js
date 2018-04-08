const http = require('http');
const chalk = require('chalk');
const path =require('path');
const fs = require('fs');
const conf = require('./config/defaultConfig');

const server = http.createServer((req, res)=>{
	const filePath = path.join(conf.root,req.url);
	fs.stat(filePath,(err,stats)=>{
		if(err){
			res.statusCode = 404;
			res.setHeader('Content-Type','text/plain');
			res.end('is not a directory');
			return;
		}
		if (stats.ifFile()){
			res.statusCode =200;
			res.setHeader('Content-Type','text/plain');
			fs.createReadStream(filePath).pipt(res);
		}
	});

	res.statusCode = 200;
	res.setHeader('Content-Type','text/html');
	res.end(filePath);
	
});

server.listen(conf.port,conf.hostname,()=>{
	const addr = 'http://'+conf.hostname+':'+conf.port;
	console.log('Server started at' + chalk.green(addr));
});
