const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    STRAVA_USERNAME: '',
    STRAVA_PW: '',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  defaultCommandTimeout: 10000
});


