const fs = require('fs');
const pdf = require('html-pdf');
const AutoReportUtils = require('../utils/auto-report-utils');
let AutoReportRenderer = require('./auto-report-pdf-renderer');
const AutoReportValidator = require('../utils/auto-report-validator');
const AutoReportConstants = require('../utils/auto-report-constants');

let AutoReportPDF = function() {
	this.renderer = new AutoReportRenderer();
	
	// Report Config
	this.config_properties = ['charset', 'title'];
	this.pdf_properties = ['format', 'orientation'];
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
	
	options.css = options.css || this.css;
	options.css = options.css.map(path => fs.readFileSync(path));
	options.css = options.css.join('');
	
	this.renderer.addCSS(options.css);
	
	this.template = AutoReportUtils.replaceTags(this.template, options, this.config_properties);
	this.report_config = AutoReportUtils.updateConfig(this.report_config, options, this.pdf_properties);
	
	if (options.show_footer) {
		this.report_config.footer = {
			height: '13mm',
			contents: this.renderer.renderFooter()
		};
	}
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
 * @param filepath
 * @returns {Promise}
 */
AutoReportPDF.prototype.create = function(filepath) {
	if (!filepath) {
		throw new Error('The filepath must be defined.');
	}
	
	this.template = this.renderer.getTemplate();
	
	return new Promise((resolve, reject) => {
		pdf.create(this.template, this.report_config)
		.toFile(filepath, function(err, res) {
			if (err) {
				return reject({
					status: 'error',
					error: err
				});
			}
			
			resolve({
				status: 'success',
				data: res
			});
		});
	});
};

module.exports = AutoReportPDF;