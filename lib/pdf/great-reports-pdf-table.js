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
 * Render string array as table row
 * @param row
 * @returns {string}
 */
renderRowByValues = (row) => {
	let rowContent = '<tr>';
	
	row.forEach(function(value) {
		rowContent += `<td>${value}</td>`;
	});
	
	return rowContent;
};

/**
 * Render object as table row
 * @param row
 * @param properties
 * @returns {string}
 */
renderRowByProperties = (row, properties) => {
	let rowContent = '<tr>';
	
	properties.forEach(function(property) {
		if (property.indexOf('.') !== -1) {
			row[property] = GreatReportsUtils.findPropertyNested(row, property);
		}
		
		if (!row[property]) {
			row[property] = '';
		}
		
		rowContent += `<td>${row[property]}</td>`;
	});
	
	return rowContent;
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
		if (!properties) {
			tableBody += renderRowByValues(row);
			return;
		}
		tableBody += renderRowByProperties(row, properties);
	});
	
	return tableBody;
};

/**
 * Render Table on PDF.
 * @param columns
 * @param values
 * @param options
 * @returns {string}
 */
GreatReportsPDFTable.renderTable = (columns, values, options) => {
	let table;
	let tableBody;
	let tableHeader;
	
	options = options || {};
	options.class = options.class || '';
	
	tableHeader = renderTableHeader(columns);
	tableBody = renderTableBody(values, options.properties);
	
	if (!values || !values.length) {
		tableBody = `<tr><td style="text-align: center" colspan="${columns.length}">No Records Found!</td></tr>`;
	}
	
	table = `<table class="${options.class}">${tableHeader}${tableBody}</table>`;
	
	return table;
};

/**
 * Render Grouped Table
 * @param columns
 * @param group
 * @param options
 * @returns {string}
 */
GreatReportsPDFTable.renderGroupedTable = (columns, group, options) => {
	let html = '';
	let table;
	let tableBody;
	let tableHeader = renderTableHeader(columns);
	
	group.forEach((group) => {
		if (!group.name || !group.values) {
			return;
		}
		
		html += '<div>';
		html += `<p>${group.name}</p>`;
		
		tableBody = renderTableBody(group.values, options.properties);
		table = `<table class="default-table">${tableHeader}${tableBody}</table>`;
		
		html += table;
		html += '</div>';
	});
	
	return html;
};

module.exports = GreatReportsPDFTable;