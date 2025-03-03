import { select, input } from '@inquirer/prompts'
import chalk from 'chalk'
import releasePort from './features/releasePort.js'
import proxySetting from './features/gitProxy.js'
import npmProxy from './features/npmProxy.js'

async function handlePort() {
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
}

async function handleGitProxy() {
  return select({
    message: 'Please select',
    choices: [
      { name: 'List proxy', value: 'view' },
      { name: 'Add proxy', value: 'add' },
      { name: 'Remove proxy', value: 'remove' }
    ]
  }).then(action => {
    if (action === 'view') {
      return proxySetting.listGitProxy()
    } else if (action === 'add') {
      return proxySetting.addGitProxy()
    } else if (action === 'remove') {
      return proxySetting.removeGitProxy()
    }
  })
}

async function handleNpmProxy() {
  return select({
    message: 'Please select',
    choices: [
      { name: 'List proxy', value: 'view' },
      { name: 'Add proxy', value: 'add' },
      { name: 'Remove proxy', value: 'remove' }
    ]
  }).then(action => {
    if (action === 'view') {
      return npmProxy.listNpmProxy()
    } else if (action === 'add') {
      return npmProxy.addNpmProxy()
    } else if (action === 'remove') {
      return npmProxy.removeNpmProxy()
    }
  })
}

select({
  message: 'Please select a feature',
  choices: [
    { name: 'Free Port', value: 'port' },
    { name: 'Proxy Setting', value: 'proxy' }
  ]
})
.then(feature => {
  if (feature === 'port') {
    return handlePort()
  } else if (feature === 'proxy') {
    return select({
      message: 'Please select a proxy type',
      choices: [
        { name: 'Git', value: 'git' },
        { name: 'NPM', value: 'npm' }
      ]
    }).then(type => {
      if (type === 'git') {
        return handleGitProxy()
      } else if (type === 'npm') {
        return handleNpmProxy()
      }
    })
  }
})
.catch(console.error)
