const http = require('http');
const URL = require('url').URL;

const list = ['Bread', 'Milk', 'Eggs', 'Chocolate', 'Cheese', 'Ice Cream'];

http.createServer((request, response) => {
    const url = new URL(request.url, 'http://localhost');
    const itemNum = url.searchParams.get('itemNum');

    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(`You have selected item ${itemNum}: ${list[itemNum]}.`);

}).listen(8081);
console.log('Server running at http://localhost:8081/');