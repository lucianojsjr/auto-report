const _ = require('lodash');
const async = require('async');
const puppeteer = require('puppeteer');
const AutoReportConstants = require('./auto-report-constants');

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
		content: ['page', (results, done) => {
			results.page.goto(`data:text/html,${template}`)
			  .then((page) => done(null, page))
			  .catch((error) => done(error, null));
		}],
		scripts: ['content', function(results, done) {
			if (!options.charts || !options.charts.length) {
				return done(null, true);
			}
			
			results.page.addScriptTag({
				url: 'https://code.highcharts.com/highcharts.src.js'
			}).then((page) => done(null, page))
			  .catch((error) => done(error, null));
		}],
		evaluate: ['scripts', function(results, done) {
			if (!options.charts || !options.charts.length) {
				return done(null, true);
			}
			
			results.page.evaluate((charts) => {
				charts.forEach((chart) => Highcharts.chart(chart.id, chart.options));
			}, options.charts).then((page) => done(null, page))
			  .catch((error) => done(error, null));
		}],
		pdf: ['content', 'evaluate', (results, done) => {
			const pdfOptions = _.pick(options, AutoReportConstants.pdf_options);
			
			results.page.pdf(pdfOptions).then((page) => done(null, page))
			  .catch((error) => done(error, null));
		}]
	}, (err, results) => {
		results.browser.close();
		callback(err, results);
	});
};

module.exports = PuppeteerScript;