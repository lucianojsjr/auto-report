const AutoReportConstants = require('./auto-report-constants');

let AutoReportUtils = {};

AutoReportUtils.findPropertyNested = (currentObject, property) => {
	const path = property.split('.');
	
	return path.reduce((obj, key) => (obj && obj[key]) ? obj[key] : null, currentObject);
};

AutoReportUtils.replaceTags = (template, values, properties) => {
	properties.forEach((property) => {
		if (!values[property]) {
			return console.warn(`Warning: The property ${property} was not found in values.`);
		}
		
		template = template.replace(`{{#${property}}}`, values[property]);
	});
	
	return template;
};

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