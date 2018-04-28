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

module.exports = AutoReportUtils;