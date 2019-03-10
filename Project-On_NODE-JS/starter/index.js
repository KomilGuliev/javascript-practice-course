const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);
console.log(...laptopData);


const server = http.createServer((req, res) => {

	const pathName = url.parse(req.url, true).pathname;
	const id = url.parse(req.url, true).query.id;

	if(pathName === '/products' || pathName === '/') {
		res.writeHead('200', {'Content-type': 'text/html'});

		fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
			let output, stringHtml;
			fs.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, card) => {
				stringHtml = laptopData.map(el => replaceTemplate(card, el)).join('');
				output = data.replace(/{%CARDS%}/g, stringHtml);
				
				res.end(output);
			});
		});

	} else if(pathName === '/laptop' && id < laptopData.length) {
		res.writeHead('200', {'Content-type': 'text/html'});
		
		fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
			data = replaceTemplate(data, laptopData[id]);

			res.end(data);
		});
		
	}
	
	else if((/\.(jpg|png|jpeg|gif)$/i).test(pathName)) {
		fs.readFile(`${__dirname}/data/img/${pathName}`, (err, data) => {
			res.end(data);
		})

	}


	else {
		res.writeHead('404', {'Content-type': 'text/html'});
		res.end('URL was not found on server');
	}
});

server.listen(1337, '127.0.0.1', () => {
	console.log('Listening for requests now');
});


function replaceTemplate(originHtml, ltp) {
	const arrReplacement = [/{%PRODUCT_NAME%}/g, /{%PRICE%}/g, /{%IMAGE%}/g, /{%CPU%}/g, /{%SCREEN%}/g, /{%STORAGE%}/g, /{%RAM%}/g, /{%DESCRIPTION%}/g, /{%ID%}/g];
	const arrValue = [ltp.productName, ltp.price, ltp.image, ltp.cpu, ltp.screen, ltp.storage, ltp.ram, ltp.description, ltp.id];
	
	let res = originHtml;
	arrReplacement.forEach((el, i) => {
		res = res.replace(el, arrValue[i]);
	});

	return res;
}