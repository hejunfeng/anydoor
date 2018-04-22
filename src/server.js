const http = require('http');
const conf = require('./config/defaultConfig');
const path = require('path');
const route = require('./helper/route');

class Server{
	constructor(config){
		this.config = Object.assign({},conf,config);
	}

	start(){
		const server = http.createServer((req,res)=>{
			const filePath = path.join(this.config.root,req.url);
			route(req,res,filePath,this.config);
		});
		
		server.listen(this.config.port,this.config.hostname,()=>{
			console.log('Server running now');
		});
	}
}

module.exports =Server;

