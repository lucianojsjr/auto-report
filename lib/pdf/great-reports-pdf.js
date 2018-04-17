const pdf = require('html-pdf');
const GreatReportsUtils = require('../utils/great-reports-utils');
const GreatReportsRenderer = require('./great-reports-pdf-renderer');
const GreatReportValidator = require('../utils/great-reports-validator');
const GreatReportsConstants = require('../utils/great-reports-constants');

let GreatReportsPDF = {};

/**
 * Init PDF.
 * @param template
 * @param options
 */
GreatReportsPDF.init = (template) => {
	if (!template) {
		throw new Error('No template was specified!');
	}
	
	this.template = template;
	this.report_config = GreatReportsConstants.report_pdf_config;
	
	this.header_properties = ['report_name'];
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
			height: '7mm',
			contents: GreatReportsRenderer.renderFooter()
		};
	}
};

/**
 * Render PDF Table
 * @param columns
 * @param values
 * @param properties
 */
GreatReportsPDF.renderTable = (columns, values, properties) => {
	if (!GreatReportValidator.isTableValid(columns, properties)) {
		return;
	}
	
	GreatReportsRenderer.renderTable(columns, values, properties);
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