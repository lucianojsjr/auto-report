let GreatReportValidator = {};

GreatReportValidator.isTableValid = (columns, properties) => {
	const emptyProperties = properties.filter((property) => !property);
	const emptyColumns = columns.filter((column) => !column.name);
	
	if (!columns || !columns.length) {
		throw new Error('The columns must be defined.');
	}
	
	if (!properties || !properties.length) {
		throw new Error('The properties must be defined.');
	}
	
	if (emptyProperties.length) {
		throw new Error('The properties can not be empty.');
	}
	
	if (emptyColumns.length) {
		throw new Error('The column name can not be empty.');
	}
	
	if (columns.length !== properties.length) {
		throw new Error('The columns and properties length must be equal.');
	}
	
	return true;
};

module.exports = GreatReportValidator;