const moment = require('moment');
let GreatReportsPDFTable = require('./great-reports-pdf-table');

let GreatReportsPDFRenderer = function() {
	this.footer = '';
	this.template = '';
};

/**
 * SET PDF Template.
 * @param template
 */
GreatReportsPDFRenderer.prototype.setTemplate = function(template) {
	this.template = template;
};

/**
 * GET PDF Template.
 * @returns {*}
 */
GreatReportsPDFRenderer.prototype.getTemplate = function() {
	return this.template;
};

/**
 * SET PDF Styles.
 * @returns {*}
 */
GreatReportsPDFRenderer.prototype.addCSS = function(css) {
	this.template = this.template.replace('{{#css}}', `<style>${css}</style>`);
};

/**
 * Render a tag value
 * @param tag
 * @param value
 */
GreatReportsPDFRenderer.prototype.render = function(tag, value) {
	this.template = this.template.replace(`{{@${tag}}}`, value);
};

/**
 * Render PDF Footer.
 * @returns {string}
 */
GreatReportsPDFRenderer.prototype.renderFooter = function() {
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
GreatReportsPDFRenderer.prototype.renderTable = function(columns, values, options) {
	const table = GreatReportsPDFTable.renderTable(columns, values, options);
	
	this.template = this.template.replace(`{{@${options.tag}}}`, table);
};

/**
 * Render Grouped Table
 * @param columns
 * @param group
 * @param options
 */
GreatReportsPDFRenderer.prototype.renderGroupedTable = function(columns, group, options) {
	const table = GreatReportsPDFTable.renderGroupedTable(columns, group, options);
	
	this.template = this.template.replace(`{{@${options.tag}}}`, table);
};

module.exports = GreatReportsPDFRenderer;