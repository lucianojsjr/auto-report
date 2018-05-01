const _ = require('lodash');

let AutoReportPDFTable = {};

/**
 * Render Table Header
 * @param columns
 * @returns {string}
 */
renderTableHeader = (columns) => {
	let tableHead = ``;
	
	_.each(columns, (column) => {
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
	
	_.each(row, (value) => {
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
	
	_.each(properties, (property) => {
		rowContent += `<td>${_.get(row, property, '-')}</td>`;
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
	
	_.each(values, (row) => {
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
AutoReportPDFTable.renderTable = (columns, values, options) => {
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
	
	table = `<table class="${options.class}">`;
	table += `<thead>${tableHeader}</thead>`;
	table += `<tbody>${tableBody}</tbody>`;
	table += `</table>`;
	
	return table;
};

/**
 * Render Grouped Table
 * @param columns
 * @param groups
 * @param options
 * @returns {string}
 */
AutoReportPDFTable.renderGroupedTable = (columns, groups, options) => {
	let html = '';
	let table;
	let tableBody;
	let tableHeader = renderTableHeader(columns);
	
	options = options || {};
	options.class = options.class || '';
	
	_.each(groups, (group) => {
		if (!group.name || !group.values) {
			return;
		}
		
		html += '<div>';
		html += `<p>${group.name}</p>`;
		
		tableBody = renderTableBody(group.values, options.properties);
		
		table = `<table class="${options.class}">`;
		table += `<thead>${tableHeader}</thead>`;
		table += `<tbody>${tableBody}</tbody>`;
		table += `</table>`;
		
		html += table;
		html += '</div>';
	});
	
	return html;
};

module.exports = AutoReportPDFTable;