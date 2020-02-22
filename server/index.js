const http = require('http');

const port = 8080;


//headers to allows CORS requests

const headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

// TODO: Fill with strings of your favorite quotes :)
const quotes = [
  'when work stops working, stop working',
  'two',
  'three',
  'four',
  'five'
];



//Utility Function to return a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function addNewQuote(str){
  quotes.push(str);
}

const handleRequest = function(req, res) {
  console.log(`Endpoint: ${req.url} Method: ${req.method}`);

  // redirect users to /quote if they try to hit the homepage. This should already work, no changes needed
  if (req.url == '/') {
    console.log('redirecting');
    res.writeHead(301, {...headers, Location: `http://localhost:${port}/quote`}) //redirect to quote
    res.end();
  }

  // TODO: GET ONE
  if ((req.url == '/quote/' || req.url == '/quote') && req.method == "GET") {
    // quote[getRandomInt];
    res.writeHead(200, {...headers});
    res.end(quotes[getRandomInt(0, quotes.length)]);
  }

  // TODO: POST/CREATE
  else if ((req.url == '/post/' || req.url == '/post') && req.method == "POST") {
    addNewQuote(addQuote);
  }

//CATCH ALL ROUTE
  else {
    res.writeHead(404,headers);
    res.end('Page not found');

  }
}

const server = http.createServer(handleRequest);
server.listen(port);

console.log('Server is running in the terminal!');
console.log(`Listening on http://localhost:${port}`);
