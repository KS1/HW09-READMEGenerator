const fs = require('fs');

function generateLicense(data, year) {
	console.log("inside generateLicense function")
	// console.log(data);
	console.log(data.license);
	console.log(year);

	// Copyright (c) ${year} ${data.name}
	if(data.license === "MIT") {
		return `MIT License
Copyright (c) ${year} ${data.name}
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`
	}

	if(data.license === "gpl3") {
		let gpl3 = '';
		fs.readFile('../Develop/assets/gpl3-license.txt', 'utf8', (err, licdata) => {
			if(err) {
				console.error(err);
				return;
			} 
			else {
				// gpl3 = licdata;
				// console.log("licdata: ");
				console.log(typeof(licdata));
				console.log(licdata.substring(0,300));
				return licdata;
			}
			
		});

		// console.log("gpl3: ");
		// console.log(gpl3);
		// return licdata;
	}

	if(data.license === "apache") {
		let apache = '';
		fs.readFile('../Develop/assets/apache-license.txt', 'utf8', (err, data) => {
			if(err) {
				console.error(err);
				return;
			} else {
				apache = data;
			}
		});

		return apache;
	}
}

module.exports = generateLicense;