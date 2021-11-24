import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    let target = ''

    const environmentName = core.getInput('environment-name')
    if (environmentName) {
      target = environmentName
    } else {
      const branch = core
        .getInput('branch', {required: true})
        .replace('refs/heads/', '')

      switch (branch) {
        case 'main':
        case 'master':
          target = 'prod'
          break
        case 'stage':
        case 'test':
          target = 'stage'
          break
        case 'develop':
          target = 'dev'
          break
        default:
          target = branch
          break
      }
    }

    if (target) {
      // eslint-disable-next-line i18n-text/no-en
      core.info(`Setting target environment to ${target}`)
      core.setOutput('target-environment', target)
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    core.setFailed(error.message)
  }
}

run()
