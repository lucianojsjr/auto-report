const pdf = require('html-pdf');
const moment = require('moment');
const GreatReportValidator = require('./great-report-validator');

let _this;

class GreatReport {
	constructor(template) {
		if (!template || !template.length) {
			throw new Error('No template was specified!');
		}
		
		_this = this;
		_this.report = template;
		_this.defaultValues = {
			orientation: 'landscape',
			show_footer: true
		};
		_this.reportConfig = {
			format: 'A4',
			border: {
				top: '7mm',
				left: '10mm',
				right: '10mm',
				bottom: '7mm'
			},
			footer: {
				height: '7mm',
				contents: GreatReport.renderFooter()
			}
		};
		
		_this.pdfProperties = ['orientation', 'show_footer'];
		_this.headerProperties = ['report_name'];
		_this.configProperties = ['charset', 'title'];
	}
	
	static renderFooter() {
		let html = '';
		let today = moment();
		
		html += `<div class="footer">`;
		html += `<span class="pull-left">Generated at ${today.format('YYYY-MM-DD - HH:mm')}</span>`;
		html += `<span class="pull-right">Page {{page}} of {{pages}}</span>`;
		html += `</div>`;
		
		return html;
	}
	
	static findPropertyNested(currentObject, property) {
		const path = property.split('.');
		
		return path.reduce((obj, key) => (obj && obj[key]) ? obj[key] : null, currentObject);
	}
	
	setProperties(properties, values) {
		properties.forEach((property) => {
			if (!values[property]) {
				return console.warn(`Warning: The property ${property} was not found in values.`);
			}
			
			_this.report = _this.report.replace(`{{${property}}}`, values[property]);
		});
	}
	
	setPDFProperties(values) {
		_this.pdfProperties.forEach((property) => {
			if (values[property] === undefined) {
				return _this.reportConfig[property] = _this.defaultValues[property];
			}
			
			if (property === 'show_footer' && values[property] === false) {
				return _this.reportConfig.footer = {
					height: '7mm',
					contents: ''
				};
			}
			
			_this.reportConfig[property] = values[property];
		});
	}
	
	config(options) {
		this.setPDFProperties(options);
		this.setProperties(_this.configProperties, options);
	}
	
	renderHeader(values) {
		this.setProperties(_this.headerProperties, values);
	}
	
	renderTable(columns, values, properties) {
		let tableHead = '';
		let tableBody = '';
		
		if (!GreatReportValidator.isTableValid(columns, properties)) {
			_this.report = _this.report.replace('{{table_head}}', tableHead);
			_this.report = _this.report.replace('{{table_body}}', tableBody);
			return false;
		}
		
		columns.forEach((column) => {
			tableHead += `<th>${column.name}</th>`;
		});
		
		values.forEach(function(row) {
			tableBody += '<tr>';
			
			properties.forEach(function(property) {
				if (property.indexOf('.') !== -1) {
					row[property] = GreatReport.findPropertyNested(row, property);
				}
				
				if (!row[property]) {
					row[property] = '';
				}
				
				tableBody += `<td>${row[property]}</td>`;
			});
			
			tableBody += '</tr>';
		});
		
		if (!values || !values.length) {
			tableBody += `<tr>`;
			tableBody += `<td class="text-center" colspan="${columns.length}">No Records Found!</td>`;
			tableBody += `</tr>`;
		}
		
		_this.report = _this.report.replace('{{table_head}}', tableHead);
		_this.report = _this.report.replace('{{table_body}}', tableBody);
	}
	
	create(filepath) {
		return new Promise((resolve, reject) => {
			pdf.create(_this.report, _this.reportConfig)
			   .toFile(filepath, function(err, res) {
				   if (err) {
					   return reject(err);
				   }
				
				   resolve(res);
			   });
		});
	}
}

module.exports = GreatReport;
