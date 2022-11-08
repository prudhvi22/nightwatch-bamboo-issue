// this will be in par1.js and par2.js

var downloadsFolder = require('downloads-folder');
const DOWNLOADS = downloadsFolder() // Get the local downloads folder, for all major platforms.
const PHOTO_PATH = DOWNLOADS + '//sample.png'

let photodomain = 'ahem.email'

module.exports = {

  tags: ['photo1'], '@disabled': false,

  'Navigate to MT': function (browser) {

    browser
      .url('https://www.marinetraffic.com/')
      .click('.qc-cmp2-summary-buttons > :nth-child(2)')
      .waitForElementNotPresent('.qc-cmp2-summary-buttons > :nth-child(2)')
  },

  'User login': function (browser) {

    browser
      .click('button[auth="login"]') //click log in button
      .waitForElementVisible('#email', 10000)
      .sendKeys('#email', this.tags + '@' + photodomain) // type in the email
      .waitForElementVisible('#password', 10000)
      .sendKeys('#password', this.tags + '@' + photodomain) //type in the password
      .waitForElementVisible('#login_form_submit', 10000) // wait for LOGIN button to be visible
      .click('#login_form_submit') //click LOGIN button
      .waitForElementVisible('button#user-logggin', 10000) // wait for logged-in user profile icon to be visible


  },

  'Navigate to My Account > Photos Uploaded > Upload a Photo': function (browser) {

    browser
      .url('https://www.marinetraffic.com/en/photos/upload') //navigate to MT Photo Upload page
      .execute('scrollTo(0,400)') // scroll down the page by 400 pixel vertical	
      .waitForElementVisible('span.input-group-btn', 10000) // wait until Browse button is visible

  },

  'Upload a single photo': function (browser) {

    browser
      .waitForElementPresent('.btn-file input[type="file"]', 10000) // wait for browse photo element to be present in DOM
      .uploadFile('.btn-file input[type="file"]', PHOTO_PATH) // Select Image file to upload from path (Minimum size 800x600 pixels)
      .pause(5000)

  },

  after: function (browser) {
    ['chrome', 'MicrosoftEdge'].includes(browser.options.desiredCapabilities.browserName) ? browser.closeWindow().end() : browser.end(); // if browser is not Chromium based execute .end() only
  }
};