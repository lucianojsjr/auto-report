const pdf = require('html-pdf');
const GreatReportsUtils = require('../utils/great-reports-utils');
const GreatReportsRenderer = require('./great-reports-pdf-renderer');
const GreatReportValidator = require('../utils/great-reports-validator');
const GreatReportsConstants = require('../utils/great-reports-constants');

let GreatReportsPDF = {};

/**
 * Init PDF.
 * @param template
 */
GreatReportsPDF.init = (template) => {
	if (!template) {
		throw new Error('No template was specified!');
	}
	
	//Replace all spaces between {{ }}
	this.template = template;
	this.template = this.template.replace(/\{{\s+/g, '{{');
	this.template = this.template.replace(/\s+\}}/g, '}}');
	
	this.report_config = GreatReportsConstants.report_pdf_config;
	this.config_properties = ['charset', 'title'];
	
	GreatReportsRenderer.setTemplate(this.template);
};

/**
 * Config PDF
 * @param options
 */
GreatReportsPDF.config = (options) => {
	options = options || {};
	
	this.template = GreatReportsUtils.replaceTags(this.template, options, this.config_properties);
	
	if (options.show_footer) {
		this.report_config.footer = {
			height: '30px',
			contents: GreatReportsRenderer.renderFooter()
		};
	}
};

/**
 * Render a tag value
 * @param tag
 * @param value
 */
GreatReportsPDF.render = (tag, value) => {
	if (!tag) {
		throw new Error('The tag must be defined.');
	}
	
	if (!value) {
		throw new Error('The tag must be defined.');
	}
	
	GreatReportsRenderer.render(tag, value);
};

/**
 * Render Table
 * @param columns
 * @param values
 * @param options
 */
GreatReportsPDF.renderTable = (columns, values, options) => {
	options = options || {};
	
	if (!GreatReportValidator.isTableValid(columns, options)) {
		return;
	}
	
	GreatReportsRenderer.renderTable(columns, values, options);
};

/**
 * Render Grouped Table
 * @param columns
 * @param values
 * @param options
 */
GreatReportsPDF.renderGroupedTable = (columns, values, options) => {
	options = options || {};
	
	if (!GreatReportValidator.isTableValid(columns, options)) {
		return;
	}
	
	GreatReportsRenderer.renderGroupedTable(columns, values, options);
};

/**
 * Create PDF to File
 * @param filepath
 * @returns {Promise}
 */
GreatReportsPDF.create = (filepath) => {
	if (!filepath) {
		throw new Error('The filepath must be defined.');
	}
	
	this.template = GreatReportsRenderer.getTemplate();
	
	return new Promise((resolve, reject) => {
		pdf.create(this.template, this.report_config)
		.toFile(filepath, function(err, res) {
			if (err) {
				return reject(err);
			}
			
			resolve(res);
		});
	});
};

module.exports = GreatReportsPDF;