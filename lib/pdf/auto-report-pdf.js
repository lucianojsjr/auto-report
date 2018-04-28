const fs = require('fs');
const async = require('async');
const PuppeteerScript = require('../utils/puppeteer-script');
const AutoReportUtils = require('../utils/auto-report-utils');
const AutoReportRenderer = require('./auto-report-pdf-renderer');
const AutoReportValidator = require('../utils/auto-report-validator');
const AutoReportConstants = require('../utils/auto-report-constants');

/**
 * @constructor
 */
let AutoReportPDF = function() {
	this.puppeteer = new PuppeteerScript();
	this.renderer = new AutoReportRenderer();
	
	// Report Config
	this.pdf_properties = ['format'];
	this.config_properties = ['charset', 'title'];
	this.report_config = AutoReportConstants.report_pdf_config;
};

/**
 * Init PDF.
 * @param template
 */
AutoReportPDF.prototype.init = function(template) {
	if (!template) {
		throw new Error('No template was specified!');
	}
	
	//Add Default Style to Tables
	this.css = [`${__dirname}/../css/bootstrap.min.css`, `${__dirname}/../css/auto-report.css`];
	
	//Replace all spaces between {{ }}
	this.template = template;
	this.template = this.template.replace(/\{{\s+/g, '{{');
	this.template = this.template.replace(/\s+\}}/g, '}}');
	
	this.renderer.setTemplate(this.template);
};

/**
 * Config PDF
 * @param options
 */
AutoReportPDF.prototype.config = function(options) {
	options = options || {};
	
	this.css = options.css || this.css;
	
	this.template = AutoReportUtils.replaceTags(this.template, options, this.config_properties);
	this.report_config = AutoReportUtils.updateConfig(this.report_config, options, this.pdf_properties);
};

/**
 * Add Style to Template
 * @param callback
 */
AutoReportPDF.prototype.addStyle = function(callback) {
	async.concat(this.css, fs.readFile, (err, styles) => {
		const style = styles.reduce((previousValue, currentValue) => {
			previousValue += currentValue.toString();
			
			return previousValue;
		}, '');
		
		callback(err, style);
	});
};

/**
 * Render a tag value
 * @param tag
 * @param value
 */
AutoReportPDF.prototype.render = function(tag, value) {
	if (!tag) {
		throw new Error('The tag must be defined.');
	}
	
	if (!value) {
		throw new Error('The tag must be defined.');
	}
	
	this.renderer.render(tag, value);
};

/**
 * Render Table
 * @param columns
 * @param values
 * @param options
 */
AutoReportPDF.prototype.renderTable = function(columns, values, options) {
	options = options || {};
	
	if (!AutoReportValidator.isTableValid(columns, options)) {
		return;
	}
	
	this.renderer.renderTable(columns, values, options);
};

/**
 * Render Grouped Table
 * @param columns
 * @param values
 * @param options
 */
AutoReportPDF.prototype.renderGroupedTable = function(columns, values, options) {
	options = options || {};
	
	if (!AutoReportValidator.isTableValid(columns, options)) {
		return;
	}
	
	this.renderer.renderGroupedTable(columns, values, options);
};

/**
 * Create PDF to File
 * @param path
 * @returns {Promise}
 */
AutoReportPDF.prototype.create = function(path) {
	if (!path) {
		throw new Error('The path must be defined.');
	}
	
	return new Promise((resolve, reject) => {
		async.auto({
			style: (done) => this.addStyle(done),
			create: ['style', (results, done) => {
				this.report_config.path = path;
				this.template = this.renderer.getTemplate();
				this.puppeteer.create(this.template, this.report_config, done);
			}]
		}, (error, results) => {
			if (error) {
				return reject({status: 'error', error: error});
			}
			
			resolve({status: 'success', filepath: path});
		});
	});
};

module.exports = AutoReportPDF;