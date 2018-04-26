const moment = require('moment');
let AutoReportPDFTable = require('./auto-report-pdf-table');

let AutoReportPDFRenderer = function() {
	this.footer = '';
	this.template = '';
};

/**
 * SET PDF Template.
 * @param template
 */
AutoReportPDFRenderer.prototype.setTemplate = function(template) {
	this.template = template;
};

/**
 * GET PDF Template.
 * @returns {*}
 */
AutoReportPDFRenderer.prototype.getTemplate = function() {
	return this.template;
};

/**
 * SET PDF Styles.
 * @returns {*}
 */
AutoReportPDFRenderer.prototype.addCSS = function(css) {
	this.template = this.template.replace('{{#css}}', `<style>${css}</style>`);
};

/**
 * Render a tag value
 * @param tag
 * @param value
 */
AutoReportPDFRenderer.prototype.render = function(tag, value) {
	this.template = this.template.replace(`{{@${tag}}}`, value);
};

/**
 * Render PDF Footer.
 * @returns {string}
 */
AutoReportPDFRenderer.prototype.renderFooter = function() {
	this.footer = '';
	let today = moment();
	
	this.footer += `<div class="footer">`;
	this.footer += `<span class="pull-left">Generated at ${today.format('YYYY-MM-DD - HH:mm')}</span>`;
	this.footer += `<span class="pull-right">Page {{page}} of {{pages}}</span>`;
	this.footer += `</div>`;
	
	return this.footer;
};

/**
 * Render Table on PDF.
 * @param columns
 * @param values
 * @param options
 */
AutoReportPDFRenderer.prototype.renderTable = function(columns, values, options) {
	const table = AutoReportPDFTable.renderTable(columns, values, options);
	
	this.template = this.template.replace(`{{@${options.tag}}}`, table);
};

/**
 * Render Grouped Table
 * @param columns
 * @param group
 * @param options
 */
AutoReportPDFRenderer.prototype.renderGroupedTable = function(columns, group, options) {
	const table = AutoReportPDFTable.renderGroupedTable(columns, group, options);
	
	this.template = this.template.replace(`{{@${options.tag}}}`, table);
};

module.exports = AutoReportPDFRenderer;