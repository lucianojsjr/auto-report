const moment = require('moment');
const GreatReportsUtils = require('../utils/great-reports-utils');

let GreatReportsPDFRenderer = {};

/**
 * SET PDF Template.
 * @param template
 */
GreatReportsPDFRenderer.setTemplate = (template) => {
	this.template = template;
};

/**
 * GET PDF Template.
 * @returns {*}
 */
GreatReportsPDFRenderer.getTemplate = () => {
	return this.template;
};

/**
 * Render PDF Footer.
 * @returns {string}
 */
GreatReportsPDFRenderer.renderFooter = () => {
	let html = '';
	let today = moment();
	
	html += `<div class="footer">`;
	html += `<span class="pull-left">Generated at ${today.format('YYYY-MM-DD - HH:mm')}</span>`;
	html += `<span class="pull-right">Page {{page}} of {{pages}}</span>`;
	html += `</div>`;
	
	return html;
};

/**
 * Render Table on PDF.
 * @param columns
 * @param values
 * @param properties
 */
GreatReportsPDFRenderer.renderTable = (columns, values, properties) => {
	let tableHead = '';
	let tableBody = '';
	
	columns.forEach((column) => {
		tableHead += `<th>${column.name}</th>`;
	});
	
	values.forEach(function(row) {
		tableBody += '<tr>';
		
		properties.forEach(function(property) {
			if (property.indexOf('.') !== -1) {
				row[property] = GreatReportsUtils.findPropertyNested(row, property);
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
	
	this.template = this.template.replace('{{table_head}}', tableHead);
	this.template = this.template.replace('{{table_body}}', tableBody);
};

module.exports = GreatReportsPDFRenderer;