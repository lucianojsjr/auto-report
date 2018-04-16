class GreatReportValidator {
	constructor() {
	}
	
	static isTableValid(columns, properties) {
		if (!columns || !columns.length) {
			throw new Error('The columns must be defined.');
		}
		
		if (!properties || !properties.length) {
			throw new Error('The properties must be defined.');
		}
		
		if (columns.length !== properties.length) {
			throw new Error('The columns and properties length must be equal.');
		}
		
		return true;
	}
}

module.exports = GreatReportValidator;