const async = require('async');
const puppeteer = require('puppeteer');

/**
 * @constructor
 */
const PuppeteerScript = function() {};

/**
 * Create PDF
 * @param template
 * @param options
 * @param callback
 */
PuppeteerScript.prototype.create = function(template, options, callback) {
	async.auto({
		browser: (done) => {
			puppeteer.launch()
			  .then((browser) => done(null, browser))
			  .catch((error) => done(error, null));
		},
		page: ['browser', (results, done) => {
			results.browser.newPage()
			  .then((page) => done(null, page))
			  .catch((error) => done(error, null));
		}],
		go: ['page', (results, done) => {
			results.page.goto(`data:text/html,${template}`)
			  .then((page) => done(null, page))
			  .catch((error) => done(error, null));
		}],
		pdf: ['go', 'page', (results, done) => {
			results.page.pdf(options).then((page) => done(null, page))
			  .catch((error) => done(error, null));
		}]
	}, (err, results) => {
		results.browser.close();
		callback(err, results);
	});
};

module.exports = PuppeteerScript;