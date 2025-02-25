import { select, input } from '@inquirer/prompts'
import chalk from 'chalk'
import releasePort from './features/releasePort.js'
import proxySetting from './features/proxySetting.js'

/**
 * https://www.npmjs.com/package/@inquirer/prompts
 */

const tmp1Map = {
  port: 'port',
  proxy: 'proxy',
}

const answer = await select({
  message: 'Please select a feature',
  choices: [
    {
      name: 'Free Port',
      value: tmp1Map.port,
      description: '',
    },
    {
      name: 'Proxy Setting',
      value: tmp1Map.proxy,
      description: '',
    },
  ],
})

if (answer === tmp1Map.port) {
  try {
    const port = await input({ message: 'Please enter the port number:' })
    const res = releasePort(port)
    if (res) {
      console.log(chalk.green(`Port released successfully`))
    } else {
      console.error('Failed to release port')
    }
  } catch (error) {
    console.error('Failed to release port')
    console.error(error)
  }
} else if (answer === tmp1Map.proxy) {
  const tmp2Map = {
    git: 'git',
    npm: 'npm',
  }
  const tmp2 = await select({
    message: 'Please select a proxy type',
    choices: [
      {
        name: 'Git',
        value: tmp2Map.git,
        description: '',
      },
      {
        name: 'NPM',
        value: tmp2Map.npm,
        description: '',
      },
    ],
  })
  if (tmp2 === tmp2Map.git) {
    const tmp3Map = {
      viewProxy: 'view proxy',
      addProxy: 'add proxy',
      removeProxy: 'remove proxy',
    }
    const tmp3 = await select({
      message: 'Please select',
      choices: [
        {
          name: 'List proxy',
          value: tmp3Map.viewProxy,
        },
        {
          name: 'Add proxy',
          value: tmp3Map.addProxy,
        },
        {
          name: 'Remove proxy',
          value: tmp3Map.removeProxy,
        },
      ],
    })
    if (tmp3 === tmp3Map.viewProxy) {
      proxySetting.listGitProxy()
    } else if (tmp3 === tmp3Map.addProxy) {
      proxySetting.addGitProxy()
    } else if (tmp3 === tmp3Map.removeProxy) {
      proxySetting.removeGitProxy()
    }
  } else if (tmp2 === tmp2Map.npm) {
    console.log('npm')
  }
}
