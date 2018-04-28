const cheerio = require('cheerio');
const AutoReportConstants = require('./auto-report-constants');

let AutoReportUtils = {};

/**
 * Find Nested Properties on Object
 * @param currentObject
 * @param property
 * @returns {*}
 */
AutoReportUtils.findPropertyNested = (currentObject, property) => {
	const path = property.split('.');
	
	return path.reduce((obj, key) => (obj && obj[key]) ? obj[key] : null, currentObject);
};

/**
 * Add Config to PDF
 * @param config
 * @param values
 * @param properties
 * @returns {object}
 */
AutoReportUtils.updateConfig = (config, values, properties) => {
	properties.forEach((property) => {
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
	
	properties.forEach((property) => {
		if (!values[property]) {
			return;
		}
		
		if (property === 'charset') {
			pageElement('head').append(`<meta charset=${values[property]}></meta>`);
		}
		
		if (property === 'title') {
			pageElement('head').append(`<title>${values[property]}</title>`);
		}
	});
	
	return pageElement.html();
};

module.exports = AutoReportUtils;