import { execSync } from 'child_process';
import chalk from "chalk";
import { input } from '@inquirer/prompts'

/**
 * Add NPM proxy settings
 */
async function addNpmProxy() {
  try {
    const proxyUrl = await input({ message: 'Please enter the proxy URL:' });
    execSync(`npm config set proxy ${proxyUrl}`);
    execSync(`npm config set https-proxy ${proxyUrl}`);
    console.log(chalk.green('NPM proxy settings have been added successfully'));
  } catch (error) {
    console.error('Failed to add NPM proxy settings');
    console.error(error);
  }
}

/**
 * List NPM proxy settings
 */
function listNpmProxy() {
  try {
    const httpProxy = execSync('npm config get proxy').toString().trim();
    const httpsProxy = execSync('npm config get https-proxy').toString().trim();
    
    if (httpProxy || httpsProxy) {
      console.log('Current NPM proxy settings:');
      if (httpProxy) {
        console.log(chalk.green(`proxy: ${httpProxy}`));
      }
      if (httpsProxy) {
        console.log(chalk.green(`https-proxy: ${httpsProxy}`));
      }
    } else {
      console.warn('No NPM proxy settings found');
    }
  } catch (error) {
    console.warn('No NPM proxy settings found');
  }
}

/**
 * Remove NPM proxy settings
 */
function removeNpmProxy() {
  try {
    execSync('npm config delete proxy');
    execSync('npm config delete https-proxy');
    console.log(chalk.green('NPM proxy settings have been removed successfully'));
  } catch (error) {
    console.error('Failed to remove NPM proxy settings');
    console.error(error);
  }
}

export default {
  addNpmProxy,
  listNpmProxy,
  removeNpmProxy
}