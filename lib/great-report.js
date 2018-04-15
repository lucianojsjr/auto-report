const pdf = require('html-pdf');

let _this;

class GreatReport {
	constructor(template) {
		if (!template || !template.length) {
			throw new Error('No template was specified!');
		}
		
		_this = this;
		_this.report = template;
		_this.configProperties = ['charset', 'title'];
		_this.headerProperties = ['report_name'];
	}
	
	setProperties(properties, values) {
		properties.forEach((property) => {
			if (!values[property]) {
				return console.warn(`Warning: The property ${property} was not found in values.`);
			}
			
			_this.report = _this.report.replace(`{{${property}}}`, values[property]);
		});
	}
	
	config(options) {
		this.setProperties(_this.configProperties, options);
	}
	
	renderHeader(values) {
		this.setProperties(_this.headerProperties, values);
	}
	
	create(filepath) {
		const promisse = new Promise((resolve, reject) => {
			pdf.create(_this.report).toFile(filepath, function(err, res) {
				if (err) {
					return reject(err);
				}
				
				resolve(res);
			});
		});
		
		return promisse;
	}
}

module.exports = GreatReport;
