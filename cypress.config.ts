// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'cypress'
import fs from 'fs'

export default defineConfig({
  e2e: {
    video: false,
    baseUrl: 'http://127.0.0.1:3000',
    viewportHeight: 1080,
    viewportWidth: 1920,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 1,
    setupNodeEvents(on, config) {
      const newConfig = structuredClone(config)
      // eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
      require('@cypress/code-coverage/task')(on, newConfig)

      if (config.isTextTerminal) {
        newConfig.excludeSpecPattern = [ 'cypress/e2e/**/index.cy.ts' ]
      }
      if (process.env.CYPRESS_ENV === 'true') {
        newConfig.video = true
      }

      on('after:spec', (spec, results) => {
        if (results && results.video) {
          const failures = results.tests.some((test) =>
            test.attempts.some((attempt) => attempt.state === 'failed'),
          )
          if (!failures) {
            fs.unlinkSync(results.video)
          }
        }
      })

      return { ...config, ...newConfig }
    },
  },
})
