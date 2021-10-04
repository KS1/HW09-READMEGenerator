
// function returns a license badge based on which license is passed in
// if there is no license, it returns an empty string
function renderLicenseBadge(license) {
  switch(license) {
    case "apache":
      return `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
    case "gpl3":
      return '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
    case "mit":
      return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
    case "wtf":
      return '[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)';
    case "none":
    default:
      return '';
  }
}

// function to return the license link
// if there is no license, it returns an empty string
function renderLicenseLink(license) {
  switch(license) {
    case "apache":
      return `https://opensource.org/licenses/Apache-2.0`;
    case "gpl3":
      return 'https://www.gnu.org/licenses/gpl-3.0';
    case "mit":
      return 'https://opensource.org/licenses/MIT';
    case "wtf":
      return 'http://www.wtfpl.net/about/';
    case "none":
    default:
      return '';
  }
}

// function returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  let link = renderLicenseLink(license);
  let licenseStatement = "";

  if(license === "") {
    return "";
  } else if(license === "apache") {
licenseStatement = `
Licensed under the Apache, Version 2.0 (the "License") you may not use this file except in compliance with the License. You may obtain a copy of the License at
${link}
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.`;
  } else if(license === "gpl3") {
licenseStatement = `\n
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program.  If not, see ${link}.`;
  } else if(license === "mit") {
    licenseStatement = ` ${link}
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`
  } else {
    licenseStatement = "";
  }

  return licenseStatement.trim();
}

// function generates markdown for README
function generateMarkdown(data) {
  const badge = renderLicenseBadge(data.license);
  const licenseSection = renderLicenseSection(data.license);
  const date = new Date();
  const year = date.getFullYear();

  let screenshot = data.screenshot;
  if(data.screenshot !== "") {
    if(data.screenshot.indexOf(",") !== -1) {
      let screenshotList = data.screenshot.split(",");
      screenshot = '';

      for(const picID in screenshotList) {
        screenshot += `\n\n![Screenshot ${picID}](${screenshotList[picID]})`;
      }

    } else {
      screenshot += `\n\n![Screenshot](${data.screenshot})`;
      
    }

  }


  return `
# ${data.title}
${badge}
## Description
${data.description}
## Table of Contents
* [Installation](#Installation)
* [Usage](#Usage)
* [Contributing](#Contribution)
* [Tests](#Tests)
* [Questions](#Questions)
* [License](#License)
## Screenshot
![Screenshot](${data.screenshot})
${data.screenshot}
## Video
[Readme Generator video link](${data.video})

## Installation
${data.installation}
## Usage
${data.usage}
### Contribution
${data.contributionGuidelines}
### Tests
${data.tests}
### Questions
- Find me on Github: [${data.githubUsername}](https://github.com/${data.githubUsername})
- Email me at: ${data.email}
### License
Copyright (C) ${year} ${data.name}
${licenseSection}
`;

}

module.exports = generateMarkdown;

// ![Video](${data.video})
// (https://www.youtube.com/watch?v=d5q8xg6bJn4)