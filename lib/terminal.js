import { select, input } from '@inquirer/prompts'
import chalk from 'chalk'
import releasePort from './features/releasePort.js'

const answer = await select({
  message: 'Please select a feature',
  choices: [
    {
      name: 'Release Port',
      value: 'releasePort',
      description: 'Release a port',
    },
  ],
})

if (answer === 'releasePort') {
  try {
    const port = await input({ message: 'Please enter the port number' })
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
