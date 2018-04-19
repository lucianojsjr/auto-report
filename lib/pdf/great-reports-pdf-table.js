const GreatReportsUtils = require('../utils/great-reports-utils');

let GreatReportsPDFTable = {};

/**
 * Render Table Header
 * @param columns
 * @returns {string}
 */
renderTableHeader = (columns) => {
	let tableHead = ``;
	
	columns.forEach((column) => {
		tableHead += `<th>${column.name}</th>`;
	});
	
	return tableHead;
};

/**
 * Render Table Body
 * @param values
 * @param properties
 * @returns {string}
 */
renderTableBody = (values, properties) => {
	let tableBody = '';
	
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
	
	return tableBody;
};

/**
 * Render Table on PDF.
 * @param columns
 * @param values
 * @param properties
 */
GreatReportsPDFTable.renderTable = (columns, values, properties) => {
	let table;
	let tableHeader = renderTableHeader(columns);
	let tableBody = renderTableBody(values, properties);
	
	if (!values || !values.length) {
		tableBody = `<tr><td class="text-center" colspan="${columns.length}">No Records Found!</td></tr>`;
	}
	
	table = `<table class="default-table">${tableHeader}${tableBody}</table>`;
	
	return table;
};

/**
 * Render Grouped Table
 * @param columns
 * @param group
 * @param properties
 * @returns {string}
 */
GreatReportsPDFTable.renderGroupedTable = (columns, group, properties) => {
	let html = '';
	let table;
	let tableBody;
	let tableHeader = renderTableHeader(columns);
	
	group.forEach((group) => {
		if (!group.name || !group.values) {
			return;
		}
		
		html += `<p>${group.name}</p>`;
		
		tableBody = renderTableBody(group.values, properties);
		table = `<table class="default-table">${tableHeader}${tableBody}</table>`;
		
		html += table;
	});
	
	return html;
};

module.exports = GreatReportsPDFTable;