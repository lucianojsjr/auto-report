let AutoReportValidator = {};

/**
 * Check if table to render
 * is valid
 * @param columns
 * @param tag
 * @param properties
 * @returns {boolean}
 */
AutoReportValidator.isTableValid = (columns, {tag, properties = []}) => {
	let emptyProperties = [];
	const emptyColumns = columns.filter((column) => !column.name);
	
	if (properties.length) {
		emptyProperties = properties.filter((property) => !property);
	}
	
	if (!tag) {
		throw new Error('The tag must be defined.');
	}
	
	if (!columns || !columns.length) {
		throw new Error('The columns must be defined.');
	}
	
	if (emptyColumns.length) {
		throw new Error('The column name can not be empty.');
	}
	
	if (properties.length && emptyProperties.length) {
		throw new Error('The properties length can not be empty.');
	}
	
	if (properties.length && (columns.length !== properties.length)) {
		throw new Error('The columns and properties length must be equal.');
	}
	
	return true;
};

/**
 * Check if chart to render
 * is valid
 * @param chart
 * @returns {boolean}
 */
AutoReportValidator.isChartValid = (chart) => {
	if (!chart) {
		return true;
	}
	
	if (!chart.id) {
		throw new Error('The chart id must be defined.');
	}
	
	if (!chart.options) {
		throw new Error('The chart options must be defined.');
	}
	
	return true;
};

module.exports = AutoReportValidator;