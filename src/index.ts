#!/usr/bin/env node
import inquirer from 'inquirer';
import fs from 'fs';

const askProjectName = async (): Promise<string> => {
  const { projectName } = await inquirer.prompt({
    name: 'projectName',
    type: 'input',
    message: 'What would you like to name your project directory?',
    default() {
      return 'ts-node-project';
    },
  });

  return projectName;
};

const createDirectory = async (projectName: string): Promise<void> => {
  const directoryPath = `./${projectName}`;

  if (fs.existsSync(directoryPath)) {
    throw new Error('Directory with the supplied project name already exists');
  }

  fs.mkdirSync(directoryPath);
};

const copyConfigFiles = async (projectName: string): Promise<void> => {
  const filesInDirectory = fs.readdirSync('./');

  console.log('\nCopying config files to project directory...');

  filesInDirectory.forEach((file: string) => {
    if (!fs.lstatSync(`./${file}`).isDirectory()) {
      console.log(file);
      fs.copyFileSync(`./${file}`, `./${projectName}/${file}`);
    }
  });
};

const createProject = async (projectName: string): Promise<void> => {
  await createDirectory(projectName);
  await copyConfigFiles(projectName);
  await createDirectory(`${projectName}/src`);
};

const run = async () => {
  try {
    const projectName = await askProjectName();

    await createProject(projectName);
  } catch (error) {
    if (error instanceof Error) {
      console.log('\nFailed to create project:', error.message);
      return;
    }

    throw error;
  }
};

await run();
