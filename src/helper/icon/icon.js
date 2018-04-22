const path = require('path');
const fs = require('fs');
const iconPath = path.join(__dirname, '/icons');
var readDir = fs.readdirSync(iconPath);
// console.log(readDir);


module.exports = (fileName)=>{
	for( var i in readDir){
		const iconName = readDir[i].split('.')[0].toUpperCase();
		if(fileName.indexOf(iconName)!==-1){
			return path.join(iconPath,readDir[i]);
		}
	}
	return path.join(iconPath,readDir[i]);
};

