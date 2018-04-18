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
 * @param properties
 */
GreatReportsPDFRenderer.renderTable = (columns, values, properties) => {
	const tag = 'table';
	const table = GreatReportsPDFTable.renderTable(columns, values, properties);
	
	this.template = this.template.replace(`{{${tag}}`, table);
};

module.exports = GreatReportsPDFRenderer;