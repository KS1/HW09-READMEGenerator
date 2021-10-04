// Including packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require("./utils/generateMarkdown.js");

// This is not mandatory requirement in user story.
// TODO: This code does not work. Make it work. 
// const generateLicense = require("./utils/generateLicense.js");

// Create an array of questions for user input
  const questions = [
    {
      type: "Input",
      name: "name",
      message: "Your Name:",
      default: "KS"
    },
    {
      type: "Input",
      name: "email",
      message: "Your Email:",
      default: "ks@gmail.com"
    },
    {
      type: "Input",
      name: "githubUsername",
      message: "Your GitHub username:",
      default: "KS1"
    },
    {
      type: "Input",
      name: "title",
      message: "Project Title:",
      default: "README Generator"
    },
    {
      type: "list",
      name: "license",
      message: "Select A License:",
      choices: [      
        {
          name: "GNU GPLv3",
          value: "gpl3",
          short: "GNU GPLv3"
        },  
        {
          name: "MIT License",
          value: "mit",
          short: "MIT License"
        },        
        {
          name: "Apache, Version 2.0",
          value: "apache",
          short: "Apache"
        }
              
      ]
    },
    // This is not mandatory requirement in user story.
    // TODO: This code does not work. Make it work.
    // {
    //     type: "confirm",
    //     name: "generateLicense",
    //     message: "Do you want to generate the license File? ",
    //     default: true
    // },
    {
      type: "input",
      name: "description",
      message: "Project Description:",
      default: `
      This program generates a README file using the command line interface 
      and Node.js dynamically. \n
      Runs in the terminal and prompts the user for information, 
      which is then populated in README file.`,
      validate: function (answer) {
          if (answer.length < 1) {
              return console.log("A valid project description is required.");
          }
          return true;
      }
    },
    {
      type: "editor",
      name: "installation",
      message: "Installation Instructions:",
      default: `\n 
                1. git clone this repo. \n
                2. Run npm install on your command line to install 
                   the package.json package dependency on your local machine by typing npm init. \n
                3. After you have installed node, install the inquirer extension 
                   by typing in your command line npm install inquirer.`
    },
    {
      type: "input",
      name: "usage",
      message: "Usage Instructions:",
      default: `\n 
                Run node index.js in the terminal. \n
                Answer each prompt as thoroughly as possible. \n
                Markdown can be used, except for new lines.`
    },
    {
      type: "input",
      name: "contributionGuidelines",
      message: "Contribution Guidelines:",
      default: `\n
      Please fork this repo to create your own generator. \n
      The README created by this generator is formatted for specific use-cases.`
    },
    {
      type: "input",
      name: "tests",
      message: "How to Run the Tests:",
      default: `No tests available.`
    },
    {
      type: "input",
      name: "screenshot",
      message: "Filename of screenshot:",
      default: `readme-generator-screenshot.png`   
    },
    {
      type: "input",
      name: "video",
      message: "Video Path:",
      default: `https://www.youtube.com/watch?v=d5q8xg6bJn4`
      // `https://youtu.be/d5q8xg6bJn4`
    },
    {
        type: "input",
        name: "directory",
        message: "Where should this be saved? (*path name* only): ",
        default: `./output/`
    }
  ];
  
// function to write README file
function writeToFile(path, data) {

  let markdown = generateMarkdown(data);

  if(path !== "") { path += "\\"; }

  // create markdown file
  fs.writeFile(`${path}README.md`, markdown.trim(), (err) =>
    err ? console.error(err) : console.log('Saved README.md')
  );

  // This is not mandatory requirement in user story.
  // TODO: This code does not work. Make it work.
  // // create license file IF user said "yes"
  // if(data.generateLicense) {
  // 	let lic = generateLicense(data);    
  // 	console.log(lic);
  // 	fs.writeFile(`${path}LICENSE`, lic.trim(), (err) =>
	//     err ? console.error(err) : console.log('Saved LICENSE')
	//   );
  // }
  
}

// Function to initialize app
function init() {
  inquirer.prompt(questions)
    .then(answers => {
      writeToFile(answers.directory, answers);
    })
    .catch(error => {
      if(error.isTtyError) {
        console.error("prompt couldn't be rendered in the current environment");
      } else {
          console.error(error);
      }
    });
}

// Execute init function 
init();
