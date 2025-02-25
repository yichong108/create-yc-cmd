import { execSync } from 'child_process';
import chalk from "chalk";
import { input } from '@inquirer/prompts'

/**
 * Add Git proxy settings for both HTTP and HTTPS
 */
async function addGitProxy() {
  try {
    // 分别设置 http 和 https 代理
    const httpProxyUrl = await input({ message: 'Please enter the HTTP proxy URL:' });
    execSync(`git config --global http.proxy ${httpProxyUrl}`);
    console.log(chalk.green('HTTP proxy setting has been added successfully'));

    const httpsProxyUrl = await input({ message: 'Please enter the HTTPS proxy URL:' });
    execSync(`git config --global https.proxy ${httpsProxyUrl}`);
    console.log(chalk.green('HTTPS proxy setting has been added successfully'));
  } catch (error) {
    console.error('Failed to add Git proxy settings');
    console.error(error);
  }
}

/**
 * List Git proxy settings
 */
function listGitProxy() {
  // 执行git config --global --get-regexp http.proxy和https.proxy命令
  try {
    const httpResult = execSync('git config --global --get-regexp http.proxy').toString();
    const httpsResult = execSync('git config --global --get-regexp https.proxy').toString();
    
    if (httpResult || httpsResult) {
      console.log('Current Git proxy settings:');
      if (httpResult) {
        console.log(chalk.green(httpResult));
      }
      if (httpsResult) {
        console.warn(chalk.green(httpsResult));
      }
    } else {
      console.warn('No Git proxy settings found');
    }
  } catch (error) {
    console.warn('No Git proxy settings found');
  }
}

/**
 * Remove Git proxy settings for both HTTP and HTTPS
 */
function removeGitProxy() {
  try {
    execSync('git config --global --unset http.proxy');
    execSync('git config --global --unset https.proxy');
    console.log(chalk.green('Git proxy settings have been removed successfully'));
  } catch (error) {
    console.error('Failed to remove Git proxy settings');
    console.error(error);
  }
}

export default {
  addGitProxy,
  listGitProxy,
  removeGitProxy
}