#!/usr/bin/env node
import inquirer from 'inquirer';

const askProjectName = async () => {
  const { projectName } = await inquirer.prompt({
    name: 'projectName',
    type: 'input',
    message: 'What would you like to name your project directory?',
    default() {
      return 'ts-node-project';
    },
  });

  console.log(`Thanks faor providing: ${projectName}`);
};

await askProjectName();
