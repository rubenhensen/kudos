const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    STRAVA_USERNAME: 'ruben.hensen@pm.me',
    STRAVA_PW: 'YSp5DNftY^g%3P',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  defaultCommandTimeout: 10000
});


