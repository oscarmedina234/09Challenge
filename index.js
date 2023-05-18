// This adds inquire and fs functionality 
const inquirer = require('inquirer');
const fs = require('fs');
// Prompts the users questions in the command line
inquirer
  .prompt([
    {
      type: 'input',
      name: 'github',
      message: 'What is your github username?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email address?',
    },
    {
      type: 'input',
      name: 'projectTitle',
      message: 'What is your project name?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Please write a description about your project',
    },
    {
      type: 'list',
      name: 'license',
      message: 'What kind of license does your project have?',
      choices: [
        'MIT',
        'APACHE 2.0',
        'GPL 3.0',
        'BSD 3',
        'none'
      ],
    },
    {
      type: 'input',
      name: 'install',
      message: 'What command should be run to install dependencies?',
      default() {
        return 'npm i';
      },
    },
    {
        type: 'input',
        name: 'test',
        message: 'What command should be run to run test?',
        default() {
            return 'npm run test';
        },
      },
      {
        type: 'input',
        name: 'usage',
        message: 'What should the user know to about using the repo?',
      },
      {
        type: 'input',
        name: 'contribute',
        message: 'What should the user need to know about contributing to the repo?',
      },
  ])
  //Takes the answers and passes them into the readme template
  .then((answers) => {
    const readmeContent = generateREADME(answers);
// writes the read me file from the answers 
    fs.writeFile('README.md', readmeContent, (err) =>
      err ? console.log(err) : console.log('Successfully created readme file!')
    );
  });

// This is the read me template that the answers get passed into. 
const generateREADME = ({ projectTitle, license, description, install, usage, contribute, test, email, github}) =>
  `# ${projectTitle}

${license}
  ## Description
  
  ${description}
  
  ## Table of Contents (Optional)
  
  If your README is long, add a table of contents to make it easy for users to find what they need.
  
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
  
  ## Installation
  
  To install necessary dependencies, run the following command:

  
  ${install}
  
  
  ## Usage
  
  This is how you use it ${usage}

  
  ## License
  
 This project is licensed under the ${license} license. 
  
  
  ## Contributing
  
  ${contribute}
  
  ## Tests
  
  To run the test, run this command:

  ${test}

  ## Questions 

  If you have any questions about the repo, open an issue or contact me directly at [email](${email}). You can find more of my work at [github](https://https://github.com/${github}).`

