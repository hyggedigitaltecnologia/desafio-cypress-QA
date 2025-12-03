const { defineConfig } = require('cypress')
const allureWriter = require('@shelex/cypress-allure-plugin/writer')
const path = require('path')
const fs = require('fs')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.netshoes.com.br',
    specPattern: 'cypress/e2e/**/*.spec.js',
    supportFile: 'cypress/support/e2.js',
    screenshotOnRunFailure: true,
    video: true,
    videoCompression: 32,
    pageLoadTimeout: 90000,
    // Reporter JUnit para publicar resultados no GitHub (dorny/test-reporter)
    reporter: 'junit',
    reporterOptions: {
      mochaFile: 'results/junit/test-results-[hash].xml',
      testsuitesTitle: 'Cypress E2E Suite',
      toConsole: false
    },
    env: {
      allure: true,
      allureReuseAfterSpec: true,
      allureAttachRequests: true
    },
    setupNodeEvents(on, config) {
      // Allure Reporter
      allureWriter(on, config)
      
      // Criar pasta allure-results se não existir
      const allureDir = path.join(__dirname, 'allure-results')
      if (!fs.existsSync(allureDir)) {
        fs.mkdirSync(allureDir, { recursive: true })
      }
      
      // Screenshot organization by test name
      on('after:screenshot', (details) => {
        try {
          if (details && details.name) {
            const testName = details.name.includes(' -- ') 
              ? details.name.split(' -- ')[1] 
              : details.name
            
            // Remover caracteres especiais do nome da pasta
            const safeName = testName
              .replace(/[<>:"|?*]/g, '')
              .replace(/\s+/g, ' ')
              .trim()
            
            const screenshotDir = path.join('cypress/screenshots', safeName)
            
            if (!fs.existsSync(screenshotDir)) {
              fs.mkdirSync(screenshotDir, { recursive: true })
            }
            
            const fileName = path.basename(details.path)
            const newPath = path.join(screenshotDir, fileName)
            
            if (fs.existsSync(details.path)) {
              fs.renameSync(details.path, newPath)
              return { path: newPath }
            }
          }
        } catch (error) {
          console.log('Screenshot organization error:', error.message)
        }
        return details
      })
      
      // Browser launch configuration
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push('--no-sandbox')
          launchOptions.args.push('--disable-dev-shm-usage')
          launchOptions.args.push('--disable-gpu')
        }
        return launchOptions
      })
      
      return config
    }
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  chromeWebSecurity: false,
  responseTimeout: 30000
})
