const _ = require('lodash');
const async = require('async');
const puppeteer = require('puppeteer');
const AutoReportUtils = require('./auto-report-utils');
const AutoReportConstants = require('./auto-report-constants');

/**
 * @constructor
 */
const PuppeteerScript = function() {};

/**
 * Check if option has header or footer
 * @param options
 */
checkHeaderAndFooter = (options) => {
	if (!options.footer && !options.header) {
		return;
	}
	
	options.header = options.header || {};
	options.footer = options.footer || {};
	
	options.displayHeaderFooter = true;
	
	options.headerTemplate = options.header.template || '{{@empty}}';
	options.footerTemplate = options.footer.template || '{{@empty}}';
	
	options.headerTemplate = AutoReportUtils.formatTags(options.headerTemplate);
	options.footerTemplate = AutoReportUtils.formatTags(options.footerTemplate);
	
	options.margin.top = options.header.height || options.margin.top;
	options.margin.bottom = options.footer.height || options.margin.bottom;
	
	_.each(AutoReportConstants.page_template_map, (value, key) => {
		options.headerTemplate = options.headerTemplate.replace(`{{@${key}}}`, value);
		options.footerTemplate = options.footerTemplate.replace(`{{@${key}}}`, value);
	});
	
	console.log(_.pick(options, AutoReportConstants.pdf_options));
	return _.pick(options, AutoReportConstants.pdf_options);
};

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
			options = checkHeaderAndFooter(options);
			
			results.page.pdf(options).then((page) => done(null, page))
			  .catch((error) => done(error, null));
		}]
	}, (err, results) => {
		results.browser.close();
		callback(err, results);
	});
};

module.exports = PuppeteerScript;