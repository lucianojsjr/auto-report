const AutoReportPDFTable = require('./auto-report-pdf-table');

/**
 * @constructor
 */
let AutoReportPDFRenderer = function() {
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
 * Render a tag value
 * @param tag
 * @param value
 */
AutoReportPDFRenderer.prototype.render = function(tag, value) {
	this.template = this.template.replace(`{{@${tag}}}`, value);
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