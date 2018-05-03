const _ = require('lodash');
const cheerio = require('cheerio');
const AutoReportConstants = require('./auto-report-constants');

let AutoReportUtils = {};

/**
 * Format Tags to remove
 * multiple spaces
 * @param template
 * @returns {*}
 */
AutoReportUtils.formatTags = (template) => {
	if (!template) {
		return '';
	}
	
	template = template.replace(/\{{\s+/g, '{{');
	template = template.replace(/\s+\}}/g, '}}');
	
	return template;
};

/**
 * Add Config to PDF
 * @param config
 * @param values
 * @param properties
 * @returns {object}
 */
AutoReportUtils.updateConfig = (config, values, properties) => {
	_.each(properties, (property) => {
		if (!values[property]) {
			config[property] = AutoReportConstants.report_pdf_config[property];
			return;
		}
		
		config[property] = values[property];
	});
	
	return config;
};

/**
 * Add Properties to page HEAD
 * @param template
 * @param values
 * @param properties
 * @returns {object}
 */
AutoReportUtils.updateTemplateHead = (template, values, properties) => {
	const pageElement = cheerio.load(template);
	
	_.each(properties, (property) => {
		if (!values[property]) {
			return;
		}
		
		if (property === 'charset') {
			pageElement('head')
			  .append(`<meta charset=${values[property]}></meta>`);
		}
		
		if (property === 'title') {
			pageElement('head').append(`<title>${values[property]}</title>`);
		}
	});
	
	return pageElement.html();
};

module.exports = AutoReportUtils;