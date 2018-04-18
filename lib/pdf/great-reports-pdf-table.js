const GreatReportsUtils = require('../utils/great-reports-utils');

let GreatReportsPDFTable = {};

/**
 * Render Table on PDF.
 * @param columns
 * @param values
 * @param properties
 */
GreatReportsPDFTable.renderTable = (columns, values, properties) => {
	let table;
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
	
	table = `<table class="default-table">${tableHead}${tableBody}</table>`;
	
	return table;
};

module.exports = GreatReportsPDFTable;