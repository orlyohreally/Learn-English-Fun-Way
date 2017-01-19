var http = require('http');

http.createServer(function(request, response){
	response.writeHead(200, {"Content-Type": "text/plain"});
	//response.write("Hello world");
	var fs = require('fs');
	var path = require('path');
	var filePath = path.join(__dirname, 'index.html');
	fs.readFile(filePath, {encoding:'utf-8'}, function(err, data){
		if(!err){
			var Canvas = require('canvas');
			var canvas = new Canvas(1800, 360);
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(data);
			response.end();
		}
	})
	
}).listen(8888);