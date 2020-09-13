// const profileDataArgs = process.argv.slice(2, process.argv.length);
// // console.log(profileDataArgs);

// // Notice the lack of parentheses around the `profileDataArr` parameter?
// const printProfileData = profileDataArr => {
//     for (let i = 0; i < profileDataArr.length; i += 1) {
//       console.log(profileDataArr[i]);
      
//       profileDataArr.forEach(profileItem => console.log(profileItem));
//     };
// }
  
//   printProfileData(profileDataArgs);

// const fs = require('fs');
// const generatePage = require('./src/page-template.js');
// const profileDataArgs = process.argv.slice(2);
// const [name, github] = profileDataArgs;



// fs.writeFile('./index.html', generatePage(name, github), err => {
//   if (err) throw new Error(err);

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });

const inquirer = require("inquirer");

const promptUser = () => {
  return inquirer.prompt([
     {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username (Required)',
      validate: gitUserInput => {
        if (gitUserInput) {
          return true;
        } else {
          console.log('Please enter your github username!');
          return false;
        }
      }
    },
    {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
    },
    {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => confirmAbout
    }
  ]);
};

const promptProject = portfolioData => {
    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
  =================
  Add a New Project
  =================
  `);
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project? (Required)',
        validate: projNameInput => {
            if (projNameInput) {
              return true;
            } else {
              console.log('Please enter your project name!');
              return false;
            }
          }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: projDesInput => {
            if (projDesInput) {
              return true;
            } else {
              console.log('Please enter a description for your project!');
              return false;
            }
        }
        },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: gitLinkInput => {
            if (gitLinkInput) {
              return true;
            } else {
              console.log('Please enter your github link!');
              return false;
            }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ]).then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
    });

  };
  
  promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });