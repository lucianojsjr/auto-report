const moment = require('moment');
const GreatReportsPDFTable = require('./great-reports-pdf-table');

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
 * Render a tag value
 * @param tag
 * @param value
 */
GreatReportsPDFRenderer.render = (tag, value) => {
	this.template = this.template.replace(`{{${tag}}}`, value);
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
 * @param options
 */
GreatReportsPDFRenderer.renderTable = (columns, values, options) => {
	const table = GreatReportsPDFTable.renderTable(columns, values, options);
	
	this.template = this.template.replace(`{{${options.tag}}`, table);
};

/**
 * Render Grouped Table
 * @param columns
 * @param group
 * @param options
 */
GreatReportsPDFRenderer.renderGroupedTable = (columns, group, options) => {
	const table = GreatReportsPDFTable.renderGroupedTable(columns, group, options);
	
	this.template = this.template.replace(`{{${options.tag}}}`, table);
};

module.exports = GreatReportsPDFRenderer;